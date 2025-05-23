import Image from "next/image";
import React from "react";

const JoinUs = () => {
  return (
    <section className="px-5 md:px-[50px] py-[50px] md:py-[75px] space-y-[40px] md:space-y-[64px]">
      <h1 className="section_title max-md:text-[30px] sm:text-center leading-relaxed">
        Become a Part of the FarmFi Family
      </h1>
      <div className="space-y-10">
        <p className="body_text text-[18px]"></p>
        <div className="max-w-[950px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 sm:gap-32">
          <div className="space-y-[30px]">
            <div className="h-[380px] w-full relative rounded-[5px] overflow-hidden">
              <Image
                src={"/assets/register-as-farmer.png"}
                fill
                alt="Card Image"
                className="object-cover"
              />
            </div>
            <div className="space-y-[15px]">
              <h1 className="base_text text-[28px] ">Register as a Farmer</h1>
              <p className="body_text leading-[27px]">
                Are you a farmer seeking to sell your agricultural produce to a
                global market? Sign up as a farmer and kickstart your journey to
                maximum sales with access to a global range of buyers.
              </p>
            </div>
          </div>
          <div className="space-y-[30px]">
            <div className="h-[380px] w-full relative rounded-[5px] overflow-hidden">
              <Image
                src={"/assets/register-as-buyer.png"}
                className="object-cover"
                fill
                alt="Card Image"
              />
            </div>
            <div className="space-y-[15px]">
              <h1 className="base_text text-[28px] ">Register as a Buyer</h1>
              <p className="body_text leading-[27px]">
                Do you want to buy high quality agricultural commodities at the
                best prices? Sign up as a buyer and enjoy the best trading
                experience with access to the best produce from reliable
                farmers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
