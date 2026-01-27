import { PictureInPictureIcon } from "lucide-react";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "~/shared";
import { useVideoPlayerContext } from "..";

function PiPButton() {
  const { uiActions } = useVideoPlayerContext();

  return (
    <Tooltip delayDuration={1000}>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={() => void uiActions.togglePiP()}
          aria-label="Picture in Picture"
        >
          <PictureInPictureIcon className="h-5 w-5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Picture in Picture (P)</TooltipContent>
    </Tooltip>
  );
}

export { PiPButton };
