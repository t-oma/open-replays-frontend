export * from "./shadcn";
export * from "./try-catch";
export * from "./pagination";

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(n, max));
}

export function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";

  const s = Math.max(0, Math.floor(seconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${ss.toString().padStart(2, "0")}`;
  }
  return `${m}:${ss.toString().padStart(2, "0")}`;
}

export const isServer = typeof window === "undefined";
export const isDesktop = isServer
  ? false
  : window.matchMedia("(pointer: fine)").matches;
