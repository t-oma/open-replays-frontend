import { useSuspenseQuery } from "@tanstack/react-query";
import { VideoPlayer } from "~/features/VideoPlayer";
import { createGetVideoQueryOptions, PageBody, Spinner } from "~/shared";
import { queryClient } from "../providers";
import type { Route } from "./+types/replay";

export function meta(/*{}: Route.MetaArgs*/) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  console.log(
    await queryClient.ensureQueryData(createGetVideoQueryOptions(params.id))
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

export default function Replay({ params }: Route.ComponentProps) {
  const { data, error } = useSuspenseQuery(
    createGetVideoQueryOptions(params.id)
  );

  if (error) return <div>Error: {error.message}</div>;

  if (!data) throw new Error("Video data is absent for some reason");

  return (
    <PageBody>
      <h1 className="text-xl font-semibold">{data!.title}</h1>

      <VideoPlayer src={data!.videoUrl} showFullscreen showPiP />

      <div className="bg-secondary rounded-md p-2">
        <span className="text-muted-foreground flex items-center gap-1 text-sm">
          {data!.views} views
        </span>
      </div>
    </PageBody>
  );
}
