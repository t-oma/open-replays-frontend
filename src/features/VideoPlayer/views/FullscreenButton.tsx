import { MaximizeIcon, MinimizeIcon } from "lucide-react";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "~/shared";
import { useVideoPlayerContext } from "..";

function FullscreenButton() {
  const { uiState, uiActions } = useVideoPlayerContext();

  return (
    <Tooltip delayDuration={1000}>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={() => void uiActions.toggleFullscreen()}
          aria-label={uiState.isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          aria-pressed={uiState.isFullscreen}
          aria-keyshortcuts="F"
        >
          {uiState.isFullscreen ? (
            <MinimizeIcon className="h-5 w-5" aria-hidden="true" />
          ) : (
            <MaximizeIcon className="h-5 w-5" aria-hidden="true" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {uiState.isFullscreen ? "Exit fullscreen (F)" : "Fullscreen (F)"}
      </TooltipContent>
    </Tooltip>
  );
}

export { FullscreenButton };
