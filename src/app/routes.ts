import { index, layout, route } from "@react-router/dev/routes";
import type { RouteConfig } from "@react-router/dev/routes";

export default [
  layout("./layout.tsx", [
    index("routes/home.tsx"),
    route("replays/:id", "routes/replays.tsx"),
    route("upload", "routes/upload.tsx"),
  ]),
] satisfies RouteConfig;
