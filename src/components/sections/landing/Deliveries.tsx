import Image from "next/image";
import React from "react";

const Deliveries = () => {
  return (
    <section className="px-5 md:px-[50px] py-[50px] md:py-[75px] space-y-[40px] md:space-y-[64px]">
      <h1 className="section_title max-md:text-[30px] sm:text-center leading-relaxed">
        Worldwide Deliveries with our Logistics Partners
      </h1>
      <div className="max-w-[950px] w-full mx-auto flex flex-col-reverse sm:flex-row max-md:gap-10 justify-between items-center">
        <p className="max-w-[431px] w-full body_text leading-[30px]">
          Worried about delivery? Worry no more. Our trusted and reliable
          logistics partners: Kobo365 and DHL are here for you. With their quick
          and high quality delivery, you are guaranteed to receive your produce
          on time and in perfect condition. They pick up the produce from the
          farmer and deliver to the buyer. For the farmers, your location,
          remote or not, is certainly not a barrier. And no matter where you are
          in the world as a buyer, we have got you covered!
        </p>
        <div className="w-[395px] aspect-square rounded-[5px] relative overflow-hidden">
          <Image
            src={"/assets/logistics-illustator.png"}
            alt="SUI"
            fill
          />
        </div>
      </div>
    </section>
  );
};

export default Deliveries;
