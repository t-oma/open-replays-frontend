import {
  AVAILABLE_VIDEOS_EXTENSIONS_FULL,
  LOCAL_VIDEOS_PATH,
} from "../constants";

function localVideoPaths(): string[] {
  const videoModules = import.meta.glob("/public/replays/*.mp4", {
    eager: true,
    query: "?url",
    import: "default",
  });

  const videoPaths = Object.keys(videoModules).map((path) =>
    path.replace("/public", "")
  );

  return videoPaths;
}

function pathByID(id: string): string | undefined {
  const videoModules = import.meta.glob("/public/replays/*.mp4", {
    eager: true,
    query: "?url",
    import: "default",
  });

  const videoPaths = Object.keys(videoModules).map((path) =>
    path.replace("/public", "")
  );

  return videoPaths.find((path) => path.includes(id));
}

function idByPath(path: string): string {
  const extentionsRegex = new RegExp(
    AVAILABLE_VIDEOS_EXTENSIONS_FULL.join("|"),
    "g"
  );

  if (!path.match(extentionsRegex)) {
    throw new Error("Invalid video path");
  }

  return path.replace(LOCAL_VIDEOS_PATH, "").replace(extentionsRegex, "");
}

export { localVideoPaths, pathByID, idByPath };

export * from "./shadcn";
