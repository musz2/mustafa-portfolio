/// <reference types="vite/client" />

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    /** React 18 does not type the `inert` attribute yet. */
    inert?: string;
  }
}

export {};
