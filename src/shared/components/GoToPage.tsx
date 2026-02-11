import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { Button, createPaginationUrl, Input } from "..";

type GoToPageProps = {
  totalPages: number;
};

function GoToPage({ totalPages }: GoToPageProps) {
  const [page, setPage] = useState<number | null>(null);

  const navigate = useNavigate();

  const goToPath = !page
    ? `${window.location.pathname}${window.location.search}`
    : createPaginationUrl(Math.min(page, totalPages));

  return (
    <div className="flex items-center justify-center gap-2">
      <Button variant="outline" asChild onClick={() => setPage(null)}>
        <Link to={goToPath}>Go to</Link>
      </Button>
      <Input
        value={page ?? ""}
        placeholder="123"
        onChange={(e) => {
          const page = parseInt(e.target.value, 10);
          setPage(isNaN(page) ? null : page);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (!page) return;

            navigate(goToPath);
            setPage(null);
          }
        }}
        name="pageToGo"
        className="w-16 text-center"
      />
    </div>
  );
}

export { GoToPage };
export type { GoToPageProps };
