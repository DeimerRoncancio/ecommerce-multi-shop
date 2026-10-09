import {
  ErrorResponse,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { useEffect } from "react";
import NotFoundPage from "./shared/ui/NotFoundPage";
import { useCartStore } from "./cart/storage/cart";
import { useStepsStorage } from "./cart/storage/steps";
import { useWishListStorage } from "./wishlist/storage/useWishListStorage";
import { Route } from "./+types/root";
import "./index.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico?v=3" sizes="any" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon-blanco.ico?v=3" sizes="any" media="(prefers-color-scheme: dark)" />
        <link rel="icon" type="image/svg+xml" href="/svg/favicon-tema.svg?v=3" />
        <link rel="apple-touch-icon" href="/png/apple-touch-icon.png?v=2" />
        <link rel="manifest" href="/site.webmanifest?v=2" />
        <meta name="theme-color" content="#ff4b14" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700;800&display=swap"
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
  useEffect(() => {
    useCartStore.persist.rehydrate();
    useWishListStorage.persist.rehydrate();
    useStepsStorage.persist.rehydrate();
  }, []);

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
                <p className="text-lg text-ink">{details}</p>
              </div>
            </div>
            {stack && (
              <pre className="w-full h-100 p-4 text-sm overflow-x-auto">
                <code>{stack}</code>
              </pre>
            )}
          </div>
        )
      }
    </>
  );
}
