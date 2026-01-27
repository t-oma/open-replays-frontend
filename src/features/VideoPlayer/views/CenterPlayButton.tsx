import { PlayIcon } from "lucide-react";
import { useVideoPlayerContext } from "..";

function CenterPlayButton() {
  const { state, actions } = useVideoPlayerContext();

  return (
    <button
      className="absolute inset-0 flex items-center justify-center"
      onClick={() => void actions.toggle()}
      aria-label={state.playing ? "Pause video" : "Play video"}
    >
      {!state.playing && (
        <div className="bg-primary flex items-center justify-center rounded-full p-2">
          <PlayIcon className="h-6 w-6 text-white" />
        </div>
      )}
    </button>
  );
}

export { CenterPlayButton };
