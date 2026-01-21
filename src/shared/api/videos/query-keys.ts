export const videoKeys = {
  all: ["videos"] as const,
  lists: () => [...videoKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...videoKeys.lists(), filters] as const,
  get: (filename: string) => [...videoKeys.all, filename] as const,
};
