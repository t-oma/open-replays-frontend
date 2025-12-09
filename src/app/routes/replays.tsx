import { ReplayPage } from "~/features/Replay";
import type { Route } from "./+types/replays";

export function meta(/*{}: Route.MetaArgs*/) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

// export async function loader({ params }: Route.LoaderArgs) {}

export default function ReplaysRoute({ params }: Route.ComponentProps) {
  return <ReplayPage id={params.id} />;
}
