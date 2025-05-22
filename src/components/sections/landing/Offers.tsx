import { offers } from "@/lib/constants";
import { MoveUpRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../../ui/button";
import Link from "next/link";

const Offers = () => {
  return (
    <section className="px-5 md:px-[50px] py-[50px] md:py-[75px] space-y-[40px] md:space-y-[64px]">
      <h1 className="section_title max-md:text-[30px] sm:text-center leading-relaxed">
        What we Offer
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 lg:gap-y-[64px]">
        {offers.map((offer, idx) => (
          <div
            key={idx}
            className="flex gap-3 items-start md:justify-center"
          >
            <div className="flex justify-center items-center min-h-[44px] min-w-[44px] rounded-[12px] border border-[#B3B3B3]">
              <Image
                src={offer.iconSrc}
                height={24}
                width={24}
                alt={offer.title}
              />
            </div>
            <div>
              <p className="max-w-[190px] w-full body_text md:text-[18px] font-medium leading-[28px]">
                {offer.title}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full justify-center md:items-center gap-5 flex flex-col md:flex-row">
        <Button
          className="group bg-[var(--forest-green)] hover:bg-[var(--forest-green)]/90 rounded-full !px-7 py-6 call_to_action_btn_text font-bold"
          asChild
        >
          <Link href={"/auth"}>
            Join Us Today
            <MoveUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </Button>
        <Button
          className="group bg-[var(--chestnut-brown)] hover:bg-[var(--chestnut-brown)]/90 rounded-full px-8 py-6 call_to_action_btn_text font-bold"
          asChild
        >
          <Link href={"/auth"}>Discover More Features!</Link>
        </Button>
      </div>
    </section>
  );
};

export default Offers;
