import { useEffect } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { VideosGrid } from "~/features/Home";
import { getErrorMessage, isApiError, PageBody, Spinner } from "~/shared";
import { createListVideosQueryOptions } from "~/shared/api/videos/query-options";
import { queryClient } from "../providers";

export function meta(/*{}: Route.MetaArgs*/) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function clientLoader() {
  console.log(
    await queryClient.ensureQueryData(createListVideosQueryOptions({}))
  );
}

export function HydrateFallback() {
  return (
    <PageBody>
      <div className="flex flex-1 items-center justify-center py-8">
        <Spinner className="text-primary size-10" />
      </div>
    </PageBody>
  );
}

export default function Home() {
  const { data, error, isError } = useSuspenseQuery(
    createListVideosQueryOptions({})
  );

  // Handle errors with toast notifications
  useEffect(() => {
    if (isError && error) {
      const message = getErrorMessage(error);
      toast.error(message);

      // Log detailed error in development
      if (import.meta.env.DEV && isApiError(error)) {
        console.error("Home page error:", {
          code: error.code,
          status: error.status,
          message: error.message,
          details: error.details,
        });
      }
    }
  }, [isError, error]);

  if (isError) {
    return (
      <PageBody>
        <div className="flex flex-1 flex-col items-center justify-center gap-4 py-8">
          <p className="text-destructive text-lg">Failed to load videos</p>
          <p className="text-muted-foreground text-sm">
            {getErrorMessage(error)}
          </p>
        </div>
      </PageBody>
    );
  }

  const { data: videos } = data;

  return (
    <PageBody>
      <h1 className="text-lg font-semibold">Latest Replays</h1>

      <VideosGrid videos={videos} />
    </PageBody>
  );
}
