import { Volume2Icon, VolumeXIcon } from "lucide-react";
import {
  Button,
  Slider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/shared";
import { useVideoPlayerContext } from "..";

function VolumeControl() {
  const { state, actions, computed } = useVideoPlayerContext();

  return (
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
            aria-pressed={state.muted}
            aria-keyshortcuts="M"
          >
            {state.muted || state.volume === 0 ? (
              <VolumeXIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Volume2Icon className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {state.muted ? "Unmute (M)" : "Mute (M)"}
        </TooltipContent>
      </Tooltip>

      <div className="w-28">
        <Slider
          value={[computed.volumeValue]}
          min={0}
          max={100}
          step={1}
          onValueChange={([v]) => actions.setVolume((v ?? 0) / 100)}
          aria-label="Volume"
          aria-valuetext={`Volume ${computed.volumeValue}%`}
        />
      </div>
    </div>
  );
}

export { VolumeControl };
