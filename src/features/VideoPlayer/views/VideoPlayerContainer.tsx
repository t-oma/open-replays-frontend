import { BufferingSpinner, useVideoPlayerContext } from "..";

type VideoPlayerContainerProps = {
  children: React.ReactNode;
  ref: React.Ref<HTMLDivElement>;

  spinner?: boolean;
};

function VideoPlayerContainer({
  children,
  ref,
  spinner = true,
}: VideoPlayerContainerProps) {
  const { state, uiActions } = useVideoPlayerContext();

  return (
    <div
      ref={ref}
      className="relative bg-black"
      onPointerMove={() => {
        uiActions.scheduleHide();
      }}
      onPointerLeave={() => {
        if (!state.playing) return;

        uiActions.setShowControls(false);
      }}
      role="region"
      aria-label="Video player"
    >
      {children}

      {/* Screen reader announcements */}
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {state.playing ? "Playing" : "Paused"}
        {state.waiting && " Buffering"}
        {state.ended && " Video ended"}
      </div>

      {spinner && <BufferingSpinner />}
    </div>
  );
}

export { VideoPlayerContainer };
