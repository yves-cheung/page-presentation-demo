import Image from "next/image";
import outcomeStat from "../sample_data/outcome.json";

export default function Outcome() {
  const stats = [
    { number: "180+", label: "場次", color: "#D37748" },
    { number: "50,000+", label: "學生人次", color: "#8B4513" },
    { number: "150+", label: "學校", color: "#A0522D" },
  ];

  return (
    <section className="w-full py-16 px-8 md:px-16 lg:px-32 min-h-screen flex flex-col justify-between relative">
      <div className="w-full flex flex-col items-end mb-12 relative">
        <h2 className="text-2xl md:text-3xl font-medium text-custom-black text-center z-10 relative">
          教育成果
        </h2>

        <svg
          className="absolute bottom-0 right-0 transform translate-x-[10%] translate-y-[25%] w-[130px] md:w-[120px]"
          viewBox="0 0 100 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="480" height="30" fill="#D37748" />
        </svg>
      </div>

      {/* Background chagning Statistic Image */}
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center w-full relative">
        <Image
          src={outcomeStat[0].img}
          alt="Education Outcome Statistics"
          width={400}
          height={400}
          className="max-w-md h-auto z-10"
        />
        <Image
          src="/outcome/bg.png"
          alt="bacground decoration"
          width={400}
          height={400}
          className="absolute w-full z-0 "
        />
      </div>

      <div className="w-full flex justify-end ">
        <p className="text-xs"> 資料來源：賽馬會中國詩人別傳教育劇場計劃 2021-2022 研究報告</p>
      </div>

      {/* Moving text box */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center">
        <div className="bg-white/70 border-1 border-custom-black p-6 px-10 rounded-xl text-center z-20 w-fit">
          <p>{outcomeStat[0].text}</p>
        </div>
      </div>
    </section>
  );
}
