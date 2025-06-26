import {
  ErrorResponse,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import NotFoundPage from "./shared/ui/NotFoundPage";
import { Route } from "./+types/root";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1"
        />
        <title>Multi Shop</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div id="root">
          {children}
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;
  const errResponse = error as ErrorResponse;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "Parece que estas en el lugar equivocado."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <>
      {
        errResponse.status === 404 ? (
          <NotFoundPage message={message} details={details} />
        ) : (
          <div className="container mx-auto mt-8">
            <div className="flex w-full justify-center">
              <div className="flex flex-col gap-3 'my-7'">
                <h1 className="text-5xl text-center">{message}</h1>
                <p className="text-lg text-black">{details}</p>
              </div>
            </div>
            {stack && (
              <pre className="w-full h-[400px] p-4 text-sm overflow-x-auto">
                <code>{stack}</code>
              </pre>
            )}
          </div>
        )
      }
    </>
  );
}
