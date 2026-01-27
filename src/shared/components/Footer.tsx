import { Link } from "react-router";

import { Button } from "./ui/button";

function Footer() {
  return (
    <footer className="bg-muted flex w-full items-center px-4 py-4">
      <Button asChild variant="link" className="text-foreground">
        <Link to="/">OpenReplays</Link>
      </Button>
    </footer>
  );
}

export { Footer };
