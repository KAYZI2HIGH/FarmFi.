import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const TransactionLayout = ({array}: {array: number[]}) => {
  return (
    <div className="border border-black rounded-[5px] max-w-[740px] mt-5">
      {array.map((_, idx) => (
        <div key={idx} className="flex flex-col sm:flex-row justify-between p-[10px] border-b border-black gap-2 md:gap-5">
          <div className="flex gap-3 max-md:items-center md:gap-7">
            <div className="size-[60px] relative overflow-hidden rounded-full">
              <Image
                src={"/assets/avatar/david.png"}
                alt="produce-image"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-[17px] font-medium capitalize">
                Benson Boone
              </h1>
              <p className="text-[12px] capitalize">{100 * (idx + 1)} USDC</p>
            </div>
          </div>
          <Button
            variant={"link"}
            className="text-[#2463EB] text-[13px] underline font-normal cursor-pointer hover:opacity-80 ml-auto"
          >
            Transaction details
          </Button>
        </div>
      ))}
    </div>
  );
};

export default TransactionLayout;
