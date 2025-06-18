import {
  ErrorResponse,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { Route } from "./+types/root";
import NavBar from "./shared/components/navbar/NavBar";
import Footer from "./shared/components/footer/Footer";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>My App</title>
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
  const err = error as ErrorResponse;

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
      <NavBar />
      <main className="container mx-auto">
        <div className={`flex w-full ${err.status === 404 && 'h-full items-center ml-[-70px]'} justify-center`}>
          {
            err.status === 404 &&
            <DotLottieReact
              src="/animations/404.json"
              autoplay
              style={{ width: 400, height: 400 }}
            />
          }
          <div className={`flex flex-col gap-3 ${!err.status && 'my-7'}`}>
            <h1 className={`${err.status ? 'text-8xl': 'text-5xl text-center'}`}>{message}</h1>
            <p className={`text-lg text-black ${!err.status && 'text-center'}`}>{details}</p>
          </div>
        </div>
        {stack && (
          <pre className="w-full h-[400px] p-4 text-sm overflow-x-auto">
            <code>{stack}</code>
          </pre>
        )}
      </main>
      <Footer />
    </>
  );
}
