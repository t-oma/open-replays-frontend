import { useNavigate } from "react-router";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiClient } from "~/shared";
import { videoKeys } from "./query-keys";
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
  });
}
