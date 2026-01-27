import { useCallback, useEffect, useRef, useState } from "react";

import {
  CenterPlayButton,
  FullscreenButton,
  PiPButton,
  PlayPauseButton,
  ProgressBar,
  TimeDisplay,
  VideoPlayerBottom,
  VideoPlayerContainer,
  VideoPlayerOverlay,
  VolumeControl,
} from ".";
import { useVideo, VideoPlayerContext } from "..";
import type { VideoPlayerContextValue } from "..";

type VideoPlayerProps = {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  showFullscreen?: boolean;
  showPiP?: boolean;
  className?: string;
  onEnded?: () => void;
};

function VideoPlayer({
  src,
  poster,
  autoPlay,
  showFullscreen,
  showPiP,
  onEnded,
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hideTimerRef = useRef<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isSeeking, setIsSeeking] = useState(false);

  const {
    ref: videoRef,
    state,
    actions,
    el,
  } = useVideo({
    initialMuted: !!autoPlay,
    initialVolume: 0.1,
    timeSync: "raf",
  });

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

    // Fullscreen API: requestFullscreen() returns Promise and triggers fullscreenchange [web:72]
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
      // toast/tooltip
    }
  }, [el]);

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

  const contextValue: VideoPlayerContextValue = {
    state,
    el,
    actions,
    uiState: {
      isFullscreen,
      showControls,
      isSeeking,
    },
    uiActions: {
      setIsSeeking,
      toggleFullscreen,
      togglePiP,
      scheduleHide,
      setShowControls,
    },
    computed: {
      volumeValue,
      seekTime,
    },
  };

  return (
    <VideoPlayerContext value={contextValue}>
      <VideoPlayerContainer ref={containerRef}>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="aspect-video w-full"
          playsInline
          preload="metadata"
          autoPlay={autoPlay}
        />

        <VideoPlayerOverlay>
          <CenterPlayButton />

          <VideoPlayerBottom>
            {showPiP && (
              <div className="absolute -top-4 right-2 -translate-y-1/2">
                <PiPButton />
              </div>
            )}
            <ProgressBar />

            <div
              className="flex items-center gap-2 py-2 text-white"
              role="toolbar"
              aria-label="Video control buttons"
            >
              <div className="flex flex-1 items-center gap-2">
                <PlayPauseButton />
                <TimeDisplay />
              </div>

              <VolumeControl />
              {showFullscreen && <FullscreenButton />}
            </div>
          </VideoPlayerBottom>
        </VideoPlayerOverlay>
      </VideoPlayerContainer>
    </VideoPlayerContext>
  );
}

export { VideoPlayer };
