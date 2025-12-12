import { Link } from "react-router";

import { AuthButtons } from "./AuthButtons";
import { Button } from "./ui";

function Header() {
  return (
    <header className="bg-muted flex w-full items-center justify-between px-4 py-4">
      <Link to="/" className="text-lg">
        OpenReplays
      </Link>

      <Button asChild variant="outline">
        <Link to="/upload" className="">
          Upload
        </Link>
      </Button>

      <AuthButtons />
    </header>
  );
}

export { Header };
