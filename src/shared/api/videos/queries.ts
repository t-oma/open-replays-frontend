import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { videosAPI } from "./videos";

export const videoKeys = {
  all: () => ["videos"] as const,
  lists: () => [...videoKeys.all(), "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...videoKeys.lists(), filters] as const,
};

export function useVideos() {
  return useQuery({
    queryKey: videoKeys.lists(),
    queryFn: videosAPI.getAll,
  });
}

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
