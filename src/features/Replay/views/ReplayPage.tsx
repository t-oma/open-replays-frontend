import { PageBody, videosAPI } from "~/shared";

type ReplayProps = {
  filename: string;
};

export default function ReplayPage({ filename }: ReplayProps) {
  return (
    <PageBody>
      <video src={videosAPI.getWatchUrl(filename)} muted controls>
        <p>
          To view this video please enable JavaScript, and consider upgrading to
          a web browser that supports HTML5 video
        </p>
      </video>
    </PageBody>
  );
}
