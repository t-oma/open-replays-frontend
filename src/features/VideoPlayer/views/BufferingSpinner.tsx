import { Loader2Icon } from "lucide-react";
import { useVideoPlayerContext } from "..";

function BufferingSpinner() {
  const { state } = useVideoPlayerContext();

  if (!state.waiting) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center text-white">
      <Loader2Icon className="h-10 w-10 animate-spin" />
    </div>
  );
}

export { BufferingSpinner };
