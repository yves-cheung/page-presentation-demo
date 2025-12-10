import Header from "./components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-start bg-primary-bg font-sans">
      <Header />
      <Image
        src="/hero_section.png"
        alt="Header Logo"
        width={1440}
        height={50}
        className="h-auto w-full"
      />

      {/* Art education introduction */}
      <div></div>

      {/* Timeline */}
      <section></section>

      {/* Drama Ecudation System */}
      <section>
        <h3>ATL戲劇教育系統</h3>
        <Image
          src="/drama_education_system.png"
          alt="Header Logo"
          width={1440}
          height={50}
          className="h-auto w-full"
        />
      </section>

      {/* Outcome */}
      <section>
        <h3>教育成果</h3>
      </section>

      {/* Interviews */}
      <section>
        {/* use card_bg.png as background*/}
      </section>

      {/* Drama showcast */}
      <section></section>

      <button></button>
    </div>
  );
}
