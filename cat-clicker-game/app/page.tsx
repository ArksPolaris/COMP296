import Image from "next/image";
import Clicker from "./components/clicker";
import { CatsUp, ClickUp } from "./components/powerups";


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
          <p className = "consoleOld"> 
                <span>&nbsp;.&nbsp;</span><span id="readout5"></span><br />
                <span>&nbsp;.&nbsp;</span><span id="readout4"></span><br />
                <span>&nbsp;.&nbsp;</span><span id="readout3"></span><br />
                <span>&nbsp;.&nbsp;</span><span id="readout2"></span><br />
            </p>
            <p className = "console"> 
                <span>&nbsp;&gt;&nbsp;</span><span id="readout1">Welcome to the Cat Shelter</span><span id="cursor" className = "pulsate">|</span>
            </p>
        </div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <p id="bal">Balance</p>
          <p id="click">Clicks</p>
        </div>
        <Clicker />
      


        <div className="flex flex-col gap-4">
          <p>Power-Ups</p>
          <div className="flex gap-4">
            <ClickUp />
            <CatsUp />
          </div>
        </div>
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
