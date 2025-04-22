'use client';
import Image from "next/image";
import Clicker from "./components/clicker";
import { PowerUps } from "./components/powerups";
import { Console, ReadoutsProvider } from "./components/console";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <ReadoutsProvider>
          <Console />
        </ReadoutsProvider>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <p id="bal">Balance</p>
          <p id="click">Clicks</p>
        </div>
        <Clicker />
      
        <PowerUps />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/ArksPolaris/COMP296/tree/main/cat-clicker-game"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          The Github
        </a>
       
      </footer>
    </div>
  );
}
