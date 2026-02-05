export const videoKeys = {
  all: ["videos"] as const,
  lists: () => [...videoKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...videoKeys.lists(), filters] as const,
  details: () => [...videoKeys.all, "detail"] as const,
  detail: (id: string) => [...videoKeys.details(), id] as const,
  delete: (id: string) => [...videoKeys.all, "delete", id] as const,
};
