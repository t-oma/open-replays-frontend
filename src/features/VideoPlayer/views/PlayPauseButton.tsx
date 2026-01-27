import { PauseIcon, PlayIcon } from "lucide-react";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "~/shared";
import { useVideoPlayerContext } from "..";

function PlayPauseButton({ className }: { className?: string }) {
  const { state, actions } = useVideoPlayerContext();

  return (
    <Tooltip delayDuration={1000}>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={className}
          onClick={() => void actions.toggle()}
          aria-label={state.playing ? "Pause" : "Play"}
          aria-pressed={state.playing}
          aria-keyshortcuts="Space K"
        >
          {state.playing ? (
            <PauseIcon className="h-5 w-5" aria-hidden="true" />
          ) : (
            <PlayIcon className="h-5 w-5" aria-hidden="true" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {state.playing ? "Pause (K/Space)" : "Play (K/Space)"}
      </TooltipContent>
    </Tooltip>
  );
}

export { PlayPauseButton };
