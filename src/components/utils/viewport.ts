/** Mobile browsers fire `resize` continuously as the address bar shows and
 *  hides. Every listener that rebuilds layout, re-splits text or tears down
 *  ScrollTriggers on that event turns an ordinary scroll into a stutter.
 *
 *  A real layout change always changes the width (rotation, window drag,
 *  desktop resize). A pure address-bar move only changes the height, and by
 *  less than the bar itself. This reports only the former. */
export function onViewportResize(handler: () => void, delay = 200) {
  let lastWidth = window.innerWidth;
  let lastHeight = window.innerHeight;
  let timer: number | undefined;

  const listener = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const widthChanged = width !== lastWidth;
    // 160px comfortably clears every mobile browser chrome bar.
    const heightChanged = Math.abs(height - lastHeight) > 160;

    if (!widthChanged && !heightChanged) return;

    lastWidth = width;
    lastHeight = height;

    window.clearTimeout(timer);
    timer = window.setTimeout(handler, delay);
  };

  window.addEventListener("resize", listener, { passive: true });

  return () => {
    window.clearTimeout(timer);
    window.removeEventListener("resize", listener);
  };
}
