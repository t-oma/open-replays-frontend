export const videoKeys = {
  all: ["videos"] as const,
  lists: () => [...videoKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...videoKeys.lists(), filters] as const,
  get: (id: string) => [...videoKeys.all, id] as const,
};
