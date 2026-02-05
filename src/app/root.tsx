import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";

import "./app.css";

import { getErrorMessage, isApiError, Toaster } from "~/shared";
import { Providers } from "./providers";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-screen flex-col">
        <Providers>{children}</Providers>
        <Toaster richColors />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  // Handle RouteErrorResponse (React Router errors)
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : `Error ${error.status}`;
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  }
  // Handle API errors from our backend
  else if (isApiError(error)) {
    message = `Error ${error.status}`;
    details = getErrorMessage(error);
  }
  // Handle generic JavaScript errors
  else if (error instanceof Error) {
    message = "Error";
    details = error.message;

    // Show stack trace in development
    if (import.meta.env.DEV) {
      stack = error.stack;
    }
  }

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-destructive mb-4 text-4xl font-bold">{message}</h1>
        <p className="text-muted-foreground mb-8 text-lg">{details}</p>

        {stack && (
          <pre className="bg-muted mt-4 max-w-2xl overflow-x-auto rounded-lg p-4 text-left text-sm">
            <code>{stack}</code>
          </pre>
        )}

        <a
          href="/"
          className="bg-primary text-primary-foreground hover:bg-primary/90 mt-8 inline-block rounded-md px-6 py-2"
        >
          Go Home
        </a>
      </div>
    </main>
  );
}
