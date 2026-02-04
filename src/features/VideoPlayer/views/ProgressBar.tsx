import { useMemo, useState } from "react";

import * as SliderPrimitive from "@radix-ui/react-slider";
import { formatTime } from "~/shared";
import { cn } from "~/shared/utils/shadcn";
import { useVideoPlayerContext } from "..";

function ProgressBar() {
  const { state, actions } = useVideoPlayerContext();

  const getValueLabel = (seconds: number) => {
    const current = formatTime(seconds);
    const total = formatTime(state.duration);
    return `${current} of ${total}`;
  };

  return (
    <Slider
      value={[state.currentTime]}
      buffered={state.buffered}
      min={0}
      max={state.duration || 100}
      step={0.1}
      onValueChange={([seconds]) => {
        actions.seek(seconds);
      }}
      onValueCommit={() => {
        actions.flushSeek();
      }}
      getValueLabel={getValueLabel}
    />
  );
}

function Slider({
  className,
  defaultValue,
  value,
  buffered,
  getValueLabel,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & {
  buffered: number;
  getValueLabel?: (value: number) => string;
}) {
  const [hoverSeconds, setHoverSeconds] = useState<number | null>(null);
  const [tooltipX, setTooltipX] = useState<number | null>();

  const _values = useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  );

  const currentSeconds = _values[0] ?? 0;
  const currentPercent = max > 0 ? (currentSeconds / max) * 100 : 0;
  const bufferedPercent = max > 0 ? (buffered / max) * 100 : 0;
  const hoverPercent =
    hoverSeconds !== null && max > 0 ? (hoverSeconds / max) * 100 : null;

  const ariaValueText = getValueLabel
    ? getValueLabel(currentSeconds)
    : formatTime(currentSeconds);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const position = e.clientX - rect.left;
    const percent = position / rect.width;
    const seconds = percent * max;

    setHoverSeconds(Math.max(0, Math.min(100, seconds)));
    setTooltipX(position);
  };

  const handlePointerLeave = () => {
    setHoverSeconds(null);
  };

  return (
    <div className="relative">
      {hoverSeconds !== null && (
        <div
          className="bg-foreground text-background animate-in fade-in-0 zoom-in-95 pointer-events-none absolute -top-8 z-30 -translate-x-1/2 rounded-md px-4 py-1 text-xs tabular-nums"
          style={{
            left: `${tooltipX}px`,
          }}
          role="tooltip"
          id="progress-tooltip"
        >
          {formatTime(hoverSeconds)}
        </div>
      )}

      <SliderPrimitive.Root
        data-slot="slider"
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        className={cn(
          "group relative flex h-4 w-full cursor-pointer touch-none items-end select-none data-[disabled]:opacity-50",
          className
        )}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        {...props}
      >
        <div className="relative flex h-fit w-full items-center">
          <SliderPrimitive.Track
            data-slot="slider-track"
            className={
              "bg-muted absolute h-1 w-full grow overflow-hidden rounded-full transition-[height] group-hover:h-1.5"
            }
          >
            {/* Buffered Progress */}
            <SliderPrimitive.Range
              data-slot="slider-buffered-range"
              className="absolute h-full bg-white/30 transition-[width]"
              style={{ width: `${bufferedPercent}%` }}
              role="progressbar"
              aria-label="Video buffered"
              aria-valuenow={buffered}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuetext={`${Math.round(bufferedPercent)}% buffered`}
            />

            {/* Hover Progress */}
            {hoverPercent !== null && hoverPercent > currentPercent && (
              <SliderPrimitive.Range
                data-slot="slider-hover-range"
                className="absolute h-full bg-white/30"
                style={{ width: `${hoverPercent}%` }}
                aria-hidden="true"
              />
            )}
            {/* Current Progress */}
            <SliderPrimitive.Range
              data-slot="slider-range"
              className="bg-primary absolute h-full"
              aria-hidden="true"
            />
          </SliderPrimitive.Track>

          {Array.from({ length: _values.length }, (_, index) => (
            <SliderPrimitive.Thumb
              data-slot="slider-thumb"
              key={index}
              className="border-primary ring-ring/50 block size-4 shrink-0 cursor-pointer rounded-full border bg-white shadow-sm transition-[color,box-shadow,height,width] group-hover:size-5 hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
              aria-label={`Seek to ${ariaValueText}`}
            />
          ))}
        </div>
      </SliderPrimitive.Root>
    </div>
  );
}

export { Slider };
export { ProgressBar };
