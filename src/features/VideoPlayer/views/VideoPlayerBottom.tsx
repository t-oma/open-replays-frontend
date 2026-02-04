import { useVideoPlayerContext } from "..";

type BottomBarProps = {
  children: React.ReactNode;
};

function VideoPlayerBottom({ children }: BottomBarProps) {
  const { state } = useVideoPlayerContext();

  return (
    <div
      className="absolute right-0 bottom-0 left-0 space-y-2 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-2 md:pt-4"
      onClick={(e) => e.stopPropagation()}
      role="group"
      aria-label="Video controls"
    >
      {children}

      {state.error && (
        <div
          className="mt-2 text-xs text-red-300"
          role="alert"
          aria-live="assertive"
        >
          Error: {state.error}
        </div>
      )}
    </div>
  );
}

export { VideoPlayerBottom };
