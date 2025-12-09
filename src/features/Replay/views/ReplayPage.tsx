import { PageBody } from "~/shared";
import { LOCAL_VIDEOS_PATH } from "~/shared/constants";

type ReplayProps = {
  id: string;
};

export default function ReplayPage({ id }: ReplayProps) {
  return (
    <PageBody>
      <video src={LOCAL_VIDEOS_PATH + id + ".mp4"} muted controls>
        <p>
          To view this video please enable JavaScript, and consider upgrading to
          a web browser that supports HTML5 video
        </p>
      </video>
    </PageBody>
  );
}
