import { useCallback, useEffect, useRef, useState } from "react";

import clsx from "clsx";
import {
  Loader2Icon,
  MaximizeIcon,
  MinimizeIcon,
  PauseIcon,
  PictureInPictureIcon,
  PlayIcon,
  SettingsIcon,
  Volume2Icon,
  VolumeXIcon,
} from "lucide-react";
import {
  Button,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Slider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/shared";
import { useVideo } from "../hooks";
import { SettingsDropdownMenu } from "./SettingsDropdownMenu";

type VideoPlayerProps = {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  showFullscreen?: boolean;
  showPiP?: boolean;
  className?: string;
  onEnded?: () => void;
};

export function VideoPlayer({
  src,
  poster,
  autoPlay,
  showFullscreen,
  showPiP,
  className,
  onEnded,
}: VideoPlayerProps) {
  const {
    ref: videoRef,
    state,
    actions,
    el,
  } = useVideo({
    initialMuted: !!autoPlay,
    timeSync: "raf",
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const hideTimerRef = useRef<number | null>(null);
  const [collisionBoundary, setCollisionBoundary] =
    useState<HTMLElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const progressPercent =
    state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0;
  const bufferedPercent =
    state.duration > 0 ? (state.buffered / state.duration) * 100 : 0;
  const volumeValue = state.muted ? 0 : Math.round(state.volume * 100);
  const seekTime = state.duration > 30 ? 5 : 1;

  const scheduleHide = useCallback(() => {
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);

    setShowControls(true);
    if (state.playing) {
      hideTimerRef.current = window.setTimeout(
        () => setShowControls(false),
        2500
      );
    }
  }, [state.playing]);

  const toggleFullscreen = useCallback(async () => {
    const container = containerRef.current;
    if (!container) return;

    // Fullscreen API: requestFullscreen() повертає Promise і тригерить fullscreenchange [web:72]
    if (!document.fullscreenElement) {
      await container.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  }, []);

  const togglePiP = useCallback(async () => {
    if (!el) return;

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture?.();
      } else {
        await el.requestPictureInPicture?.();
      }
    } catch {
      // можна показати toast/tooltip
    }
  }, [el]);

  const onProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    actions.seek(percent * state.duration);
  };

  // Synchronizes isFullscreen
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);

    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // onEnded callback
  useEffect(() => {
    if (state.ended) onEnded?.();
  }, [state.ended, onEnded]);

  // Hotkeys (will work when the page is in focus)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement ||
        (e.target as Element).role === "slider"
      )
        return;

      switch (e.code) {
        case "Space":
        case "KeyK":
          e.preventDefault();
          actions.toggle();
          break;
        case "ArrowLeft":
          e.preventDefault();
          actions.seek(state.currentTime - seekTime);
          break;
        case "ArrowRight":
          e.preventDefault();
          actions.seek(state.currentTime + seekTime);
          break;
        case "KeyM":
          e.preventDefault();
          actions.setMuted(!state.muted);
          break;
        case "ArrowUp":
          e.preventDefault();
          actions.setVolume(state.volume + 0.1);
          break;
        case "ArrowDown":
          e.preventDefault();
          actions.setVolume(state.volume - 0.1);
          break;
        case "KeyF":
          e.preventDefault();
          void toggleFullscreen();
          break;
        case "KeyP":
          e.preventDefault();
          void togglePiP();
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    actions,
    state.currentTime,
    state.muted,
    state.volume,
    toggleFullscreen,
    togglePiP,
    seekTime,
  ]);

  useEffect(() => {
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setCollisionBoundary(containerRef.current);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative bg-black", className)}
      onMouseMove={scheduleHide}
      onMouseLeave={() => state.playing && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="aspect-video w-full"
        playsInline
        preload="metadata"
        autoPlay={autoPlay}
      />

      {/* Overlay */}
      <div
        className={clsx(
          "absolute inset-0 -bottom-[0.5px] transition-opacity",
          showControls || !state.playing ? "opacity-100" : "opacity-0"
        )}
        onClick={() => void actions.toggle()}
      >
        {!state.waiting && !state.playing && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="bg-primary flex items-center justify-center rounded-full p-2">
              <PlayIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        )}

        {/* Bottom bar */}
        <div
          className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2 md:pt-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* PiP */}
          {showPiP && (
            <div className="absolute -top-4 right-2 -translate-y-1/2">
              <Tooltip delayDuration={1000}>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                    onClick={() => void togglePiP()}
                    aria-label="Picture in Picture"
                  >
                    <PictureInPictureIcon className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Picture in Picture (P)</TooltipContent>
              </Tooltip>
            </div>
          )}

          {/* Progress */}
          <div
            className="relative mb-3 h-1.5 cursor-pointer rounded bg-white/30"
            onClick={(e) => {
              e.stopPropagation();
              onProgressClick(e);
            }}
          >
            <div
              className="bg-primary absolute z-10 h-full rounded"
              style={{ width: `${progressPercent}%` }}
            />
            <div
              className="absolute h-full rounded bg-white/40"
              style={{ width: `${bufferedPercent}%` }}
            />
          </div>

          <div className="flex items-center gap-2 text-white">
            {/* Play/Pause */}
            <Tooltip delayDuration={1000}>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="hidden text-white hover:bg-white/10 md:inline-flex"
                  onClick={() => void actions.toggle()}
                  aria-label={state.playing ? "Pause" : "Play"}
                >
                  {state.playing ? (
                    <PauseIcon className="h-5 w-5" />
                  ) : (
                    <PlayIcon className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {state.playing ? "Pause (K/Space)" : "Play (K/Space)"}
              </TooltipContent>
            </Tooltip>

            {/* Time */}
            <span className="ml-1 text-xs text-white/90 tabular-nums">
              {formatTime(state.currentTime)} / {formatTime(state.duration)}
            </span>

            <div className="flex-1" />

            {/* Volume */}
            <div className="flex items-center gap-2">
              <Tooltip delayDuration={1000}>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                    onClick={() => actions.setMuted(!state.muted)}
                    aria-label={state.muted ? "Unmute" : "Mute"}
                  >
                    {state.muted || state.volume === 0 ? (
                      <VolumeXIcon className="h-5 w-5" />
                    ) : (
                      <Volume2Icon className="h-5 w-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {state.muted ? "Unmute (M)" : "Mute (M)"}
                </TooltipContent>
              </Tooltip>

              <div className="w-28">
                <Slider
                  value={[volumeValue]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={([v]) => actions.setVolume((v ?? 0) / 100)}
                  aria-label="Volume"
                />
              </div>
            </div>

            <SettingsDropdownMenu></SettingsDropdownMenu>

            {/* Fullscreen */}
            {showFullscreen && (
              <Tooltip delayDuration={1000}>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                    onClick={() => void toggleFullscreen()}
                    aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                  >
                    {isFullscreen ? (
                      <MinimizeIcon className="h-5 w-5" />
                    ) : (
                      <MaximizeIcon className="h-5 w-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isFullscreen ? "Exit fullscreen" : "Fullscreen (F)"}
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          {state.error ? (
            <div className="mt-2 text-xs text-red-300">
              Error: {state.error}
            </div>
          ) : null}
        </div>
      </div>

      {/* Buffering */}
      {state.waiting && (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <Loader2Icon className="h-10 w-10 animate-spin" />
        </div>
      )}
    </div>
  );
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const s = Math.max(0, Math.floor(seconds));
  const m = Math.floor(s / 60);
  const ss = s % 60;
  return `${m}:${ss.toString().padStart(2, "0")}`;
}
