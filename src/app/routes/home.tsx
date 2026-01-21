import { useSuspenseQuery } from "@tanstack/react-query";
import { VideosGrid } from "~/features/Home";
import { PageBody, Spinner } from "~/shared";
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
  const { data, error } = useSuspenseQuery(createListVideosQueryOptions({}));

  if (error) {
    return (
      <PageBody>
        <div className="flex-1 py-8 text-center">
          <p className="text-destructive">Failed to load videos</p>
        </div>
      </PageBody>
    );
  }

  return (
    <PageBody>
      <h1 className="text-lg font-semibold">Latest Replays</h1>

      <VideosGrid videos={data?.videos} />
    </PageBody>
  );
}
