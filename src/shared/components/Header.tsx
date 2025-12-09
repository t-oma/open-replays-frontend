import { Link } from "react-router";

import { Button } from "./ui/button";

function Header() {
  return (
    <header className="bg-muted flex w-full items-center justify-between px-4 py-4">
      <Link to="/" className="text-lg">
        OpenReplays
      </Link>

      <div className="flex items-center gap-4">
        <Button asChild variant="outline">
          <Link to="/login">Login</Link>
        </Button>
        <Button asChild variant="default">
          <Link to="/signup">Sign Up</Link>
        </Button>
      </div>
    </header>
  );
}

export { Header };
