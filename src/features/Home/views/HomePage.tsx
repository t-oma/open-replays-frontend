import { useEffect, useState } from "react";
import { Link } from "react-router";

import { API_URL, getVideos, idByPath, PageBody } from "~/shared";

export default function HomePage() {
  const [videos, setVideos] = useState<string[]>([]);

  useEffect(() => {
    async function fetchVideos() {
      const response = await getVideos();
      setVideos(response.videos || []);
    }

    fetchVideos();
  }, []);

  return (
    <PageBody>
      <h1 className="text-lg font-semibold">Latest Replays</h1>

      <div className="grid grid-cols-1 gap-4">
        {videos.map((filename) => (
          <Link
            key={filename}
            to={`/replays/${filename}`}
            className="bg-muted inline-flex flex-col gap-2 rounded-md p-2"
          >
            <video
              src={`${API_URL}/watch/${filename}`}
              muted
              className="rounded"
            >
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
