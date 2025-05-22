import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const OrderSummary = ({ cart }: { cart: Crop[] }) => {
  const total = cart.reduce(
    (total, item) => total + item.price * item.weight,
    0
  );
  return (
    <div className="py-[25px] space-y-4 px-4 bg-[rgba(109,_76,_65,_0.60)] w-full md:max-w-[357px]  text-white overflow-y-auto hide_scrollbar">
      <div className="pb-5  border-b border-white">
        <h1 className="text-[14px] font-semibold text-center">Order Summary</h1>
      </div>
      <div className="space-y-6 border-b border-white pb-5 px-[25px] ">
        <div className="flex justify-between items-center">
          <h1 className="text-[15px] font-semibold">Produce ({cart.length})</h1>
          <h1 className="text-[15px] font-semibold">{total} USDC</h1>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-[15px] font-semibold">Location</h1>
          <Button
            variant={"link"}
            className="font-medium text-[#CACACC] text-[12.5px] cursor-pointer"
          >
            Change
          </Button>
        </div>
      </div>
      <div className="space-y-[10px] border-b border-white pb-5 px-[25px] ">
        <h1 className="text-[12.5px] font-semibold">Olayinka Ayodele</h1>
        <h1 className="text-[12.5px] font-medium">
          No 59, Kashamawu street, Ikeja | Lagos
        </h1>
      </div>
      <div className="border-b border-white pb-5 px-[25px] flex justify-between items-center">
        <h1 className="text-[12.5px] font-semibold">Delivery Detials</h1>
        <Button
          variant={"link"}
          className="font-medium text-[#CACACC] text-[12.5px] cursor-pointer"
        >
          Change
        </Button>
      </div>
      <div className="space-y-10 border-b border-white pb-5 px-[25px] ">
        <div className="flex justify-between items-center">
          <h1 className="text-[15px] font-semibold">Logistics Details</h1>
          <h1 className="text-[15px] font-semibold">Fulflled by DHL</h1>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-[15px] font-semibold">Delivery Fee</h1>
          <h1 className="text-[15px] font-semibold">6 USDC</h1>
        </div>
      </div>
      <div className="flex justify-between items-center px-[25px]">
        <h1 className="text-[15px] font-semibold">Total</h1>
        <h1 className="text-[15px] font-semibold">{total + 6} USDC</h1>
      </div>
      <Button
        className="group bg-[var(--forest-green)] hover:bg-[var(--forest-green)]/90 rounded-full px-6 py-4 call_to_action_btn_text w-full"
        asChild
      >
        <Link href={"/"}>Pay now</Link>
      </Button>
    </div>
  );
};

export default OrderSummary;
