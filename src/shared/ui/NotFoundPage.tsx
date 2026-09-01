import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import NavBar from "../layout/navbar/NavBar";

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
            <h1 className="text-8xl font-bold text-[#3a2f2a]">{message}</h1>
            <p className="text-lg text-[#7a6f6a]">{details}</p>
          </div>
        </div>
      </main>
    </>
  )
}
