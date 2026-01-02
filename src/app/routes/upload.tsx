import { UploadForm } from "~/features/Upload";
import { PageBody } from "~/shared";

export function meta(/*{}: Route.MetaArgs*/) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Upload() {
  return (
    <PageBody className="items-center space-y-8 py-8">
      <h1 className="text-xl font-semibold">Upload Replay</h1>

      <UploadForm />
    </PageBody>
  );
}
