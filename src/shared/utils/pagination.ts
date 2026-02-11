import { clamp } from ".";
import { DEFAULT_PAGE_SIZE } from "../constants";

export function createPaginationUrl(page: number, pageSize?: number) {
  const params = new URLSearchParams();
  params.set("page", page.toString());

  if (!pageSize) {
    pageSize = DEFAULT_PAGE_SIZE;
  }
  params.set("pageSize", pageSize.toString());

  return `?${params.toString()}`;
}

export function paginationParamsFromUrl(url: URL) {
  const pageParam = url.searchParams.get("page") || "1";
  const pageSizeParam =
    url.searchParams.get("pageSize") || DEFAULT_PAGE_SIZE.toString();

  const page = Math.max(1, parseInt(pageParam, 10));
  const pageSize = clamp(parseInt(pageSizeParam, 10), 1, 100); // Clamp page size to 1-100

  return { page, pageSize };
}
