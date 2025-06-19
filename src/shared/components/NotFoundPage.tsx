import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import NavBar from "./navbar/NavBar";
import Footer from "./footer/Footer";

type NotFoundPageProps = {
  message: string;
  details: string;
}

export default function NotFoundPage({ message, details }: NotFoundPageProps) {
  return (
    <>
      <NavBar />
      <main className="container mx-auto">
        <div className="flex w-full h-full items-center ml-[-70px] justify-center">
          <DotLottieReact
            src="/animations/404.json"
            autoplay
            style={{ width: 400, height: 400 }}
          />
          <div className="flex flex-col gap-3">
            <h1 className="text-8xl">{message}</h1>
            <p className="text-lg text-black">{details}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
