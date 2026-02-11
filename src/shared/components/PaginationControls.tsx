import {
  createPaginationUrl,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "..";
import type { PaginationInfo } from "..";

function PaginationControls({ pagination }: { pagination: PaginationInfo }) {
  const { page, pageSize, totalPages, hasNextPage, hasPrevPage } = pagination;

  const pages = generatePaginationPages(page, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            to={createPaginationUrl(page - 1, pageSize)}
            aria-disabled={!hasPrevPage}
            className={!hasPrevPage ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {pages.map((pageNum) => {
          if (pageNum === "ellipsis") {
            return (
              <PaginationItem key={`ellipsis-${pageNum}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                to={createPaginationUrl(pageNum, pageSize)}
                isActive={pageNum === page}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            to={createPaginationUrl(page + 1, pageSize)}
            aria-disabled={!hasNextPage}
            className={!hasNextPage ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function generatePaginationPages(
  currentPage: number,
  totalPages: number
): (number | "ellipsis")[] {
  const delta = 1;
  const pages: (number | "ellipsis")[] = [];

  pages.push(1);

  const rangeStart = Math.max(2, currentPage - delta);
  const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

  if (rangeStart > 2) {
    pages.push("ellipsis");
  }

  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i);
  }

  if (rangeEnd < totalPages - 1) {
    pages.push("ellipsis");
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}

export { PaginationControls };
