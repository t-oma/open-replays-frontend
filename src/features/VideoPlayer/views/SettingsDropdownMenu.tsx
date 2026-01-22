import { SettingsIcon } from "lucide-react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/shared";

type SettingsDropdownMenuProps = {
  collisionBoundary?: HTMLElement | null;
};

function SettingsDropdownMenu({
  collisionBoundary,
}: SettingsDropdownMenuProps) {
  return (
    <DropdownMenu>
      <Tooltip delayDuration={1000}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              aria-label="Open settings"
            >
              <SettingsIcon className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>Settings</TooltipContent>
      </Tooltip>
      <DropdownMenuContent
        side="top"
        collisionBoundary={collisionBoundary}
      ></DropdownMenuContent>
    </DropdownMenu>
  );
}

export { SettingsDropdownMenu };
