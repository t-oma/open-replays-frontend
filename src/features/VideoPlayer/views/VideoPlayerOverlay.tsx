import clsx from "clsx";
import { useVideoPlayerContext } from "..";

type VideoPlayerOverlayProps = {
  children: React.ReactNode;
};

function VideoPlayerOverlay({ children }: VideoPlayerOverlayProps) {
  const { state, uiState } = useVideoPlayerContext();
  return (
    <div
      className={clsx(
        "absolute inset-0 -bottom-[0.5px] flex flex-col transition-opacity",
        uiState.showControls || !state.playing ? "opacity-100" : "opacity-0"
      )}
    >
      {children}
    </div>
  );
}

export { VideoPlayerOverlay };
