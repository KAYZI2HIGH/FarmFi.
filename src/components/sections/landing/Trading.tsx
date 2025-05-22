import Image from 'next/image';
import React from 'react'

const Trading = () => {
  return (
    <section className="px-5 md:px-[50px] py-[50px] md:py-[75px] space-y-[40px] md:space-y-[64px]">
      <h1 className="section_title max-md:text-[30px] sm:text-center leading-relaxed">
        Global Trading made Seamless with SUI
      </h1>
      <div className="max-w-[950px] w-full mx-auto flex flex-col-reverse sm:flex-row max-md:gap-10 justify-between items-center">
        <p className="max-w-[431px] w-full body_text leading-[30px]">
          Say goodbye to fiat conversion struggles, unstable exchange rates and
          international trading restrictions due to difference in currencies.
          FarmFi leverages the SUI Blockchain to facilitate exchange by using a
          stable crypto coin (USDC) as it&apos;s only means of exchange for
          commodity purchase. So, whether you&apos;re in Africa, Europe or
          anywhere in the world, you get to trade with the same currency. Fiat
          to cryptocurrency (USDC) conversion is done using Transak.
        </p>
        <div className="w-[395px] aspect-square rounded-[5px] relative overflow-hidden">
          <Image
            src={"/assets/sui-bg.png"}
            alt="SUI"
            fill
          />
        </div>
      </div>
    </section>
  );
}

export default Trading