import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { useEffect } from "react";
import NotFoundPage from "./shared/ui/NotFoundPage";
import ErrorPage from "./shared/ui/ErrorPage";
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
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFoundPage />;
  }

  const label = isRouteErrorResponse(error) ? `Error ${error.status}` : "Error";
  const devError = import.meta.env.DEV && error instanceof Error ? error : undefined;

  return (
    <ErrorPage
      label={label}
      message="Algo salió mal"
      details="Tuvimos un problema al cargar esta página. Inténtalo de nuevo en unos minutos."
      technicalMessage={devError?.message}
      stack={devError?.stack}
    />
  );
}
