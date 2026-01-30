import { useNavigate } from "react-router";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { videoKeys } from "./query-keys";
import { uploadVideo } from "./videos";

export function useUploadVideo() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: uploadVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: videoKeys.lists() });
      toast.success("Video uploaded successfully!");
      navigate("/");
    },
  });
}
