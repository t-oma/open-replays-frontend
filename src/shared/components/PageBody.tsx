import { cn } from "../utils";

type PageBodyProps = {
  children: React.ReactNode;
  className?: string;
};

function PageBody({ children, className }: PageBodyProps) {
  return (
    <main className={cn("flex flex-1 flex-col space-y-2 p-4", className)}>
      {children}
    </main>
  );
}

export { PageBody };
