import { Link } from "react-router";

import { idByPath, localVideoPaths, PageBody } from "~/shared";

export default function HomePage() {
  const videoPaths = localVideoPaths();

  return (
    <PageBody>
      <h1 className="text-lg font-semibold">Latest Replays</h1>

      <div className="grid grid-cols-1 gap-4">
        {videoPaths.map((path) => (
          <Link
            key={path}
            to={`/replays/${idByPath(path)}`}
            className="bg-muted inline-flex flex-col gap-2 rounded-md p-2"
          >
            <video src={path} muted className="rounded">
              <p>
                To view this video please enable JavaScript, and consider
                upgrading to a web browser that supports HTML5 video
              </p>
            </video>
            <div className="flex items-center justify-between">
              <h2 className="text-foreground">Video title</h2>
              <span className="text-muted-foreground text-xs">2025-12-01</span>
            </div>
          </Link>
        ))}
      </div>
    </PageBody>
  );
}
