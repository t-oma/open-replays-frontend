import { useEffect, useState } from "react";
import { Link, useNavigate, useRevalidator, useRouteError } from "react-router";

import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { VideosGrid } from "~/features/Home";
import { createListVideosQueryOptions } from "~/features/Videos";
import {
  Button,
  clamp,
  createPaginationUrl,
  DEFAULT_PAGE_SIZE,
  getErrorMessage,
  Input,
  isApiError,
  isSystemError,
  PageBody,
  PaginationControls,
  paginationParamsFromUrl,
  Spinner,
} from "~/shared";
import { queryClient } from "../providers";
import type { Route } from "./+types/home";

export function meta(/*{}: Route.MetaArgs*/) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const { page, pageSize } = paginationParamsFromUrl(url);

  console.log(
    await queryClient.ensureQueryData(
      createListVideosQueryOptions({ page, pageSize })
    )
  );

  queryClient.prefetchQuery(
    createListVideosQueryOptions({ page: page + 1, pageSize })
  );

  return { page, pageSize };
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

export default function Home({ loaderData }: Route.ComponentProps) {
  const { page, pageSize } = loaderData;

  const { data, error, isError } = useSuspenseQuery(
    createListVideosQueryOptions({ page, pageSize })
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

  const {
    data: { items, pagination },
  } = data;

  return (
    <PageBody>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Latest Replays</h1>
        <p className="text-muted-foreground text-sm">
          {pagination.totalItems}{" "}
          {pagination.totalItems === 1 ? "replay" : "replays"}
        </p>
      </div>

      <VideosGrid videos={items} />

      <div className="flex flex-1 items-end">
        <div className="flex w-full flex-col gap-4">
          <PaginationControls pagination={pagination} />
          <GoToPage />
        </div>
      </div>
    </PageBody>
  );
}

function GoToPage() {
  const [page, setPage] = useState<number | null>(null);

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center gap-2">
      <Button variant="outline" asChild disabled={!page}>
        {page ? (
          <Link to={createPaginationUrl(page)}>Go to</Link>
        ) : (
          <span className="text-muted-foreground">Go to</span>
        )}
      </Button>
      <Input
        value={page ?? ""}
        placeholder="123"
        onChange={(e) => {
          const page = parseInt(e.target.value, 10);
          setPage(isNaN(page) ? null : page);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (!page) return;

            navigate(createPaginationUrl(page));
            setPage(null);
          }
        }}
        name="pageToGo"
        className="w-16 text-center"
      />
    </div>
  );
}
