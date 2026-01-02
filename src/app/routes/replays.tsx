import { PageBody, videosAPI } from "~/shared";
import type { Route } from "./+types/replays";

export function meta(/*{}: Route.MetaArgs*/) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

// export async function loader({ params }: Route.LoaderArgs) {}

export default function Replay({ params }: Route.ComponentProps) {
  return (
    <PageBody>
      <video src={videosAPI.getWatchUrl(params.id)} muted controls>
        <p>
          To view this video please enable JavaScript, and consider upgrading to
          a web browser that supports HTML5 video
        </p>
      </video>
    </PageBody>
  );
}
