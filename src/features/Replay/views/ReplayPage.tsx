import { API_URL, PageBody } from "~/shared";

type ReplayProps = {
  filename: string;
};

export default function ReplayPage({ filename }: ReplayProps) {
  return (
    <PageBody>
      <video src={`${API_URL}/watch/${filename}`} muted controls>
        <p>
          To view this video please enable JavaScript, and consider upgrading to
          a web browser that supports HTML5 video
        </p>
      </video>
    </PageBody>
  );
}
