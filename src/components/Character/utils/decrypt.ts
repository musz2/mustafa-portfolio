async function generateAESKey(password: string): Promise<CryptoKey> {
  const passwordBuffer = new TextEncoder().encode(password);
  const hashedPassword = await crypto.subtle.digest("SHA-256", passwordBuffer);
  return crypto.subtle.importKey(
    "raw",
    hashedPassword.slice(0, 32),
    { name: "AES-CBC" },
    false,
    ["encrypt", "decrypt"]
  );
}

/** Streams the response so download progress is real bytes, not a guess. */
async function readWithProgress(
  response: Response,
  onProgress?: (fraction: number) => void
): Promise<ArrayBuffer> {
  const total = Number(response.headers.get("Content-Length") ?? 0);

  // No length header (or no stream support) — fall back to a plain read.
  if (!response.body || !total) return response.arrayBuffer();

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    received += value.length;
    onProgress?.(Math.min(received / total, 1));
  }

  const merged = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.length;
  }
  return merged.buffer;
}

export const decryptFile = async (
  url: string,
  password: string,
  onProgress?: (fraction: number) => void
): Promise<ArrayBuffer> => {
  const response = await fetch(url);
  const encryptedData = await readWithProgress(response, onProgress);
  const iv = new Uint8Array(encryptedData.slice(0, 16));
  const data = encryptedData.slice(16);
  const key = await generateAESKey(password);
  return crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, data);
};
