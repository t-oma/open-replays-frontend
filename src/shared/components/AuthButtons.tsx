import { Link } from "react-router";

import { LogInIcon, UserRoundPlusIcon } from "lucide-react";
import { Button } from "./ui";

function AuthButtons() {
  return (
    <>
      <div className="flex items-center gap-4 md:hidden">
        <Button asChild variant="outline" size="icon" aria-label="Login">
          <Link to="/login">
            <LogInIcon className="" />
          </Link>
        </Button>
        <Button asChild variant="default" size="icon" aria-label="Sign Up">
          <Link to="/signup">
            <UserRoundPlusIcon className="" />
          </Link>
        </Button>
      </div>

      <div className="hidden items-center gap-4 md:flex">
        <Button asChild variant="outline" aria-label="Login">
          <Link to="/login">Login</Link>
        </Button>
        <Button asChild variant="default" aria-label="Sign Up">
          <Link to="/signup">Sign Up</Link>
        </Button>
      </div>
    </>
  );
}

export { AuthButtons };
