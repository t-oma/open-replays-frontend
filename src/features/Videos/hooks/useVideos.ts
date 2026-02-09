import { useNavigate } from "react-router";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage, isApiError } from "~/shared";
import { videoKeys, videosManager } from "..";
import type { UploadFormSchema } from "..";

/**
 * Hook to upload video
 */
export function useUploadVideo() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: UploadFormSchema) => videosManager.uploadVideo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: videoKeys.lists() });
      toast.success("Video uploaded successfully!");
      navigate("/");
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);

      if (import.meta.env.DEV && isApiError(error)) {
        console.error("Upload error:", {
          code: error.code,
          status: error.status,
          message: error.message,
          details: error.details,
        });
      }
    },
  });
}

/**
 * Hook to delete video
 */
export function useDeleteVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => videosManager.deleteVideo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: videoKeys.lists() });
      toast.success("Video deleted successfully!");
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });
}
