import { formatTime } from "~/shared";
import { useVideoPlayerContext } from "..";

function TimeDisplay() {
  const { state } = useVideoPlayerContext();

  return (
    <span
      className="pointer-events-none ml-1 text-xs text-white/90 tabular-nums select-none"
      role="timer"
      aria-live="off"
    >
      {formatTime(state.currentTime)} / {formatTime(state.duration)}
    </span>
  );
}

export { TimeDisplay };
