import { useEffect } from "react";
import { useRevalidator, useRouteError } from "react-router";

import { useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { VideosGrid } from "~/features/Home";
import { createListVideosQueryOptions } from "~/features/Videos";
import {
  Button,
  getErrorMessage,
  isApiError,
  isSystemError,
  PageBody,
  Spinner,
} from "~/shared";
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

/**
 * ErrorBoundary specific for Home page
 * Catches errors from this route and provides recovery UI
 */
export function ErrorBoundary() {
  const error = useRouteError();
  const revalidator = useRevalidator();

  const isRetrying = revalidator.state === "loading";

  // Log error details in development
  useEffect(() => {
    if (import.meta.env.DEV && isApiError(error)) {
      console.error("Home page boundary caught error:", {
        code: error.code,
        status: error.status,
        message: error.message,
        details: error.details,
      });
    }
  }, [error]);

  const errorMessage = getErrorMessage(error);
  const isSystemErr = isSystemError(error);

  return (
    <PageBody>
      <div className="flex flex-1 flex-col items-center justify-center gap-6 py-12">
        <div className="text-center">
          <h2 className="text-destructive mb-2 text-2xl font-bold">
            Failed to load videos
          </h2>
          <p className="text-muted-foreground max-w-md">{errorMessage}</p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => revalidator.revalidate()}
            disabled={isRetrying}
            variant="default"
          >
            {isRetrying ? (
              <>
                <Spinner className="mr-2 size-4" />
                Retrying...
              </>
            ) : (
              "Try Again"
            )}
          </Button>

          {isSystemErr && (
            <Button variant="outline" onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          )}
        </div>

        {/* Show technical details in development */}
        {import.meta.env.DEV && isApiError(error) && (
          <div className="bg-muted mt-4 max-w-lg rounded-lg p-4 text-left">
            <h3 className="mb-2 font-semibold">Error Details (Dev Only):</h3>
            <pre className="overflow-x-auto text-xs">
              <code>
                {JSON.stringify(
                  {
                    code: error.code,
                    status: error.status,
                    message: error.message,
                    details: error.details,
                  },
                  null,
                  2
                )}
              </code>
            </pre>
          </div>
        )}
      </div>
    </PageBody>
  );
}

export default function Home() {
  const { data, error, isError } = useSuspenseQuery(
    createListVideosQueryOptions({})
  );

  // Handle errors with toast notifications (for non-fatal errors)
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
