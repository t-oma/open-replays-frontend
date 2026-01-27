import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { clamp } from "~/shared";
import type { RefCallback } from "react";

type VideoState = {
  ready: boolean;
  playing: boolean;
  waiting: boolean;
  ended: boolean;

  duration: number; // seconds
  currentTime: number; // seconds
  buffered: number; // seconds (end of last buffered range)

  muted: boolean;
  volume: number; // 0..1
  playbackRate: number;

  error?: string;
};

function getBufferedEnd(el: HTMLVideoElement) {
  const b = el.buffered;
  if (!b || b.length === 0) return 0;
  return b.end(b.length - 1);
}

type UseVideoOptions = {
  initialMuted?: boolean;
  initialVolume?: number; // 0..1
  initialPlaybackRate?: number;
  timeSync?: "timeupdate" | "raf";
};

function useVideo(options: UseVideoOptions = {}) {
  const {
    initialMuted = false,
    initialVolume = 0.5,
    initialPlaybackRate = 1,
    timeSync = "raf",
  } = options;

  const [el, setEl] = useState<HTMLVideoElement | null>(null);
  const [state, setState] = useState<VideoState>(() => ({
    ready: false,
    playing: false,
    waiting: false,
    ended: false,
    duration: 0,
    currentTime: 0,
    buffered: 0,
    muted: initialMuted,
    volume: clamp(initialVolume, 0, 1),
    playbackRate: initialPlaybackRate,
  }));

  const rafId = useRef<number | null>(null);
  const seekThrottleRef = useRef<{
    timer: number | null;
    lastExec: number;
    pending: number | null;
  }>({ timer: null, lastExec: 0, pending: null });

  const ref: RefCallback<HTMLVideoElement> = useCallback((node) => {
    setEl(node);
  }, []);

  const syncFromEl = useCallback((video: HTMLVideoElement) => {
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setState((s) => ({
      ...s,
      duration: Number.isFinite(video.duration) ? video.duration : 0,
      currentTime: video.currentTime || 0,
      buffered: getBufferedEnd(video),
      muted: video.muted,
      volume: video.volume,
      playbackRate: video.playbackRate,
      ended: video.ended,
    }));
  }, []);

  const seekInternal = useCallback(
    (timeSeconds: number) => {
      if (!el) return;

      const t = clamp(
        timeSeconds,
        0,
        Number.isFinite(el.duration) ? el.duration : timeSeconds
      );
      el.currentTime = t;
      syncFromEl(el);
    },
    [el, syncFromEl]
  );

  const seekThrottled = useCallback(
    (timeSeconds: number, waitMs = 80) => {
      if (!el) return;

      // (trailing)
      const t = clamp(
        timeSeconds,
        0,
        Number.isFinite(el.duration) ? el.duration : timeSeconds
      );
      seekThrottleRef.current.pending = t;

      const now = performance.now();
      const elapsed = now - seekThrottleRef.current.lastExec;
      const delay = Math.max(0, waitMs - elapsed);

      if (seekThrottleRef.current.timer != null) return;

      seekThrottleRef.current.timer = window.setTimeout(() => {
        seekThrottleRef.current.timer = null;
        seekThrottleRef.current.lastExec = performance.now();

        const pending = seekThrottleRef.current.pending;
        seekThrottleRef.current.pending = null;

        if (pending != null) seekInternal(pending);
      }, delay);
    },
    [el, seekInternal]
  );

  const flushSeek = useCallback(() => {
    const pending = seekThrottleRef.current.pending;

    if (seekThrottleRef.current.timer != null) {
      clearTimeout(seekThrottleRef.current.timer);
      seekThrottleRef.current.timer = null;
    }

    seekThrottleRef.current.pending = null;
    if (pending != null) seekInternal(pending);
  }, [seekInternal]);

  useEffect(() => {
    if (!el) return;

    el.muted = initialMuted;
    el.volume = clamp(initialVolume, 0, 1);
    el.playbackRate = initialPlaybackRate;
    syncFromEl(el);
  }, [el, initialMuted, initialVolume, initialPlaybackRate, syncFromEl]);

  // Media events: loadedmetadata, timeupdate, play/pause [web:29][web:30]
  useEffect(() => {
    if (!el) return;

    const onLoadedMetadata = () => {
      setState((s) => ({ ...s, ready: true, error: undefined }));
      syncFromEl(el);
    };

    const onTimeUpdate = () => {
      if (timeSync === "timeupdate") syncFromEl(el);
    };

    const onPlay = () => {
      setState((s) => ({
        ...s,
        playing: true,
        ended: false,
        error: undefined,
      }));
    };

    const onPause = () => setState((s) => ({ ...s, playing: false }));
    const onWaiting = () => setState((s) => ({ ...s, waiting: true }));
    const onPlaying = () =>
      setState((s) => ({ ...s, waiting: false, playing: true }));
    const onEnded = () =>
      setState((s) => ({ ...s, playing: false, ended: true }));
    const onProgress = () => syncFromEl(el);
    const onVolumeChange = () => syncFromEl(el);
    const onRateChange = () => syncFromEl(el);
    const onError = () => setState((s) => ({ ...s, error: "Media error" }));

    const onSeeking = () => {
      setState((s) => ({ ...s, waiting: false })); // was waiting true
      syncFromEl(el);
    };
    const onSeeked = () => {
      setState((s) => ({ ...s, waiting: false }));
      syncFromEl(el);
    };

    el.addEventListener("loadedmetadata", onLoadedMetadata);
    el.addEventListener("timeupdate", onTimeUpdate);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("waiting", onWaiting);
    el.addEventListener("playing", onPlaying);
    el.addEventListener("ended", onEnded);

    el.addEventListener("seeking", onSeeking);
    el.addEventListener("seeked", onSeeked);

    el.addEventListener("progress", onProgress);
    el.addEventListener("volumechange", onVolumeChange);
    el.addEventListener("ratechange", onRateChange);
    el.addEventListener("error", onError);

    return () => {
      el.removeEventListener("loadedmetadata", onLoadedMetadata);
      el.removeEventListener("timeupdate", onTimeUpdate);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("waiting", onWaiting);
      el.removeEventListener("playing", onPlaying);
      el.removeEventListener("ended", onEnded);

      el.removeEventListener("seeking", onSeeking);
      el.removeEventListener("seeked", onSeeked);

      el.removeEventListener("progress", onProgress);
      el.removeEventListener("volumechange", onVolumeChange);
      el.removeEventListener("ratechange", onRateChange);
      el.removeEventListener("error", onError);
    };
  }, [el, syncFromEl, timeSync]);

  // Smooth time update via requestAnimationFrame (useful for progress bar) [web:30]
  useEffect(() => {
    if (!el) return;
    if (timeSync !== "raf") return;
    if (!state.playing) return;

    const tick = () => {
      syncFromEl(el);
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = null;
    };
  }, [el, state.playing, syncFromEl, timeSync]);

  const actions = useMemo(() => {
    return {
      play: async () => {
        if (!el) return;

        try {
          await el.play();
        } catch (e) {
          setState((s) => ({
            ...s,
            error: (e as Error)?.message ?? "play() failed",
          }));
        }
      },
      pause: () => {
        if (!el) return;

        el.pause();
      },
      toggle: async () => {
        if (!el) return;

        if (el.paused) {
          try {
            await el.play();
          } catch (e) {
            setState((s) => ({
              ...s,
              error: (e as Error)?.message ?? "play() failed",
            }));
          }
        } else {
          el.pause();
        }
      },
      seek: seekInternal,
      seekThrottled,
      flushSeek,
      setMuted: (muted: boolean) => {
        if (!el) return;

        el.muted = muted;
        if (!muted && el.volume === 0) el.volume = 0.01;
        syncFromEl(el);
      },
      setVolume: (volume: number) => {
        if (!el) return;

        el.volume = clamp(volume, 0, 1);
        el.muted = el.volume === 0;
        syncFromEl(el);
      },
      setPlaybackRate: (rate: number) => {
        if (!el) return;

        el.playbackRate = rate;
        syncFromEl(el);
      },
    };
  }, [el, syncFromEl, seekInternal, seekThrottled, flushSeek]);

  return { ref, state, actions, el };
}

type UseVideoReturn = ReturnType<typeof useVideo>;
type UseVideoActions = UseVideoReturn["actions"];

export { useVideo };
export type { VideoState, UseVideoOptions, UseVideoReturn, UseVideoActions };
