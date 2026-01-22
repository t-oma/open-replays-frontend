import { VideoPlayer } from "~/features/VideoPlayer";
import { PageBody, videosAPI } from "~/shared";
import type { Route } from "./+types/replay";

export function meta(/*{}: Route.MetaArgs*/) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

// export async function clientLoader() {
//   console.log(
//     await queryClient.ensureQueryData(createListVideosQueryOptions({}))
//   );
// }
//
// export function HydrateFallback() {
//   return (
//     <PageBody>
//       <div className="flex flex-1 items-center justify-center py-8">
//         <Spinner className="text-primary size-10" />
//       </div>
//     </PageBody>
//   );
// }

export default function Replay({ params }: Route.ComponentProps) {
  return (
    <PageBody>
      <VideoPlayer
        src={videosAPI.getWatchUrl(params.id)}
        showFullscreen
        showPiP
      />
    </PageBody>
  );
}
