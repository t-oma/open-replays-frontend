import { Card, DEFAULT_PAGE_SIZE, Skeleton } from "~/shared";

function VideosSkeletonGrid() {
  return (
    <div className="grid w-full grid-cols-1 gap-4">
      {Array.from({ length: DEFAULT_PAGE_SIZE }).map((_, i) => (
        <Card key={i} className="w-full gap-2 p-2">
          <Skeleton className="aspect-video w-full" />

          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-28" />
          </div>
        </Card>
      ))}
    </div>
  );
}

export { VideosSkeletonGrid };
