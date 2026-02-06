import { useNavigate } from "react-router";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiClient, getErrorMessage, isApiError, videoKeys } from "~/shared";
import type { UploadFormSchema, UploadVideoData } from "~/shared";

export function useUploadVideo() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ title, file, thumbnail }: UploadFormSchema) => {
      const formData = new FormData();

      formData.append("video", file);
      formData.append("title", title);
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      return apiClient.postForm<UploadVideoData>(
        "/api/v1/videos/upload",
        formData
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: videoKeys.lists() });
      toast.success("Video uploaded successfully!");
      navigate("/");
    },
    onError: (error) => {
      // Show user-friendly error message
      const message = getErrorMessage(error);
      toast.error(message);

      // Log detailed error info in development
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
