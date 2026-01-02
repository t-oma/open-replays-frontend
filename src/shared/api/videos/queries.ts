import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { videoKeys } from "./query-keys";
import { videosAPI } from "./videos";

export function useUploadVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: videosAPI.upload,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: videoKeys.lists() });
      toast.success("Video uploaded successfully!");
    },
  });
}
