import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";

export default function Interviews() {
  const QnA = [
    {
      name: "陳恆輝",
      question: "some question?",
      answer: "some answer",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="my-16 px-6 md:px-10 relative">
      <Image
        src="/card_bg.png"
        alt="Education Outcome Statistics"
        width={500}
        height={500}
        className="w-full h-auto"
      />
      <div
        className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-between py-4 pl-18 pr-10 xs:py-7 xs:pl-26 xs:pr-12 sm:py-10 sm:pl-32 sm:pr-18"
        // data-aos="fade-in"
        // data-aos-offset="100"
        // data-aos-easing="ease-in-sine"
      >
        <div className="w-full space-y-1 xs:space-y-2 sm:space-y-6 flex flex-col items-start justify-start text-md xs:text-xl sm:text-2xl text-custom-black">
          <p className="text-custom-black">Q: {QnA[0].question}</p>
          <p className="text-custom-black">A: {QnA[0].answer}</p>
        </div>
        <div className="w-full flex justify-end">
          <p className="text-md xs:text-xl sm:text-2xl">受訪者： {QnA[0].name}</p>{" "}
        </div>
      </div>
    </section>
  );
}
