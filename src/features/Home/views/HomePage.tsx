import { Link } from "react-router";

import { PageBody, Spinner, useVideos, videosAPI } from "~/shared";

export default function HomePage() {
  const { data, isLoading, error } = useVideos();

  if (isLoading) {
    return (
      <PageBody>
        <div className="flex flex-1 items-center justify-center py-8">
          <Spinner className="text-primary size-10" />
        </div>
      </PageBody>
    );
  }

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

      <div className="grid grid-cols-1 gap-4">
        {data?.videos.map((replay) => (
          <Link
            key={replay.title}
            to={`/replays/${replay.filename}`}
            className="bg-muted inline-flex flex-col gap-2 rounded-md p-2"
          >
            <video
              src={videosAPI.getWatchUrl(replay.filename)}
              muted
              className="rounded"
            >
              <p>
                To view this video please enable JavaScript, and consider
                upgrading to a web browser that supports HTML5 video
              </p>
            </video>
            <div className="flex items-center justify-between">
              <h2 className="text-foreground">{replay.title}</h2>
              <span className="text-muted-foreground text-xs">
                {new Date(replay.uploadedAt).toLocaleString()}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </PageBody>
  );
}
