"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useWallet } from "@/context/WalletContext";

const OrderSummary = ({ cart }: { cart: Crop[] }) => {
  const [tx, setTx] = useState();
  // Importing the variables for signing transactions
  const { keypair, address, suiClient } = useWallet();

  //to bypass unsued variable check
  console.log(keypair, address, suiClient);

  const total = cart.reduce(
    (total, item) => total + item.price * item.weight,
    0
  );

  //hardcoding the product
  const product = {
    _id: "682fb9eefedd859ffcfbc5b8",
    price: 3,
    farmer: "6830a5fd26a731b08230f6a4",
    suiWalletAddress:
      "0xcaec2af7f3d0d2227e4b2b0efa47d3f99ccf696f8368a1e577b42fe0a3549f6f",
  };

  const handleOrder = async () => {
    console.log("sending");

    const orderres = await fetch(
      "https://farmfi-node.onrender.com/order/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buyer: "test1234@gmail.com",
          product,
          password: "test1234",
        }),
      }
    );

    const orderdata = await orderres.json();
    setTx(orderdata.serializedTransaction);
    console.log(tx);
    const digest = orderdata.serializedTransaction.digest;
    console.log(digest);
    alert(digest);
    // signSuiTransaction()
  };

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
        onClick={handleOrder}
      >
        Pay now
      </Button>
    </div>
  );
};

export default OrderSummary;
