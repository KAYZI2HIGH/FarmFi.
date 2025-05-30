'use client'
import ProfileAvatar from "@/components/custom-ui/ProfileAvater";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { shortenText } from "@/utils/shortenText";
import { Copy } from "lucide-react";
import Image from "next/image";
import React from "react";

const ProfilePage = () => {
  const walletAddress = shortenText("0xe064ed7339bea4ubfq34erf0dx9482ef", {
    maxLength: 14,
  });
  const {user} = useAuth()
  return (
    <section className="space-y-[40px] md:space-y-[60px] w-full px-5 lg:px-[60px]">
      <div className="flex justify-center items-center relative">
        <SidebarTrigger className="absolute left-0 md:hidden text-black" />
        <h1 className="text-[15px] font-semibold text-black">User Profile</h1>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start gap-10">
        <div className="flex flex-col gap-12 max-w-[400px] w-full">
          <div className="flex justify-between gap-5">
            <div className="flex gap-2 items-center justify-center">
              <ProfileAvatar
              // eslint-disable-next-line
              image={user?.imgUrl!}
              // eslint-disable-next-line
                name={user?.name!}
                className="size-[60px]"
              />
              <div className="space-y-[10px]">
                <h1 className="text-[13px] font-semibold">{user?.name}</h1>
                <p className="text-[11px] font-medium tracking-wide">
                  {user?.email}
                </p>
              </div>
            </div>
            <Button
              variant={"link"}
              className="text-[10px] font-semibold tracking-wide cursor-pointer text-[#212121]/80"
            >
              Edit Profile
            </Button>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-[15px] font-bold tracking-wide">
                Wallet Balance
              </h1>
              <div className="flex gap-1 items-center justify-center">
                <p className="text-[11px] font-semibold tracking-wide">
                  {walletAddress}
                </p>
                <button className="cursor-pointer">
                  <Copy className="size-[14px]" />
                </button>
              </div>
            </div>
            <div className="flex gap-2 items-center justify-center w-fit mt-4">
              <Image
                src={"/icons/sui-currency.png"}
                height={20}
                width={20}
                alt="sui-currency"
              />
              <h1 className="text-[18px] font-medium">500 USDC</h1>
            </div>
            <div className="flex gap-[80px] mt-5">
              <Button
                variant={"ghost"}
                className="text-[13px] font-semibold hover:bg-white/60 cursor-pointer"
              >
                Deposit{" "}
                <Image
                  src={"/icons/download_icon.svg"}
                  height={15}
                  width={14}
                  alt="download icon"
                />
              </Button>
              <Button
                variant={"ghost"}
                className="text-[13px] font-semibold flex items-center justify-center hover:bg-white/60 cursor-pointer"
              >
                Withdraw{" "}
                <Image
                  src={"/icons/withdraw.svg"}
                  height={22}
                  width={22}
                  alt="withdraw icon"
                />
              </Button>
            </div>
          </div>
        </div>
        <div className="max-w-[400px] w-full">
          <h1 className="text-[15px] font-bold tracking-wide">
            Transaction History
          </h1>
          <div className="mt-5 space-y-3">
            <div className="w-full flex justify-between items-center">
              <p className="text-[12px] font-semibold">Transaction ID: 12345</p>
              <p className="text-[12px] font-semibold">13 USDC</p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="text-[12px] font-semibold">Transaction ID: 12345</p>
              <p className="text-[12px] font-semibold">13 USDC</p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="text-[12px] font-semibold">Transaction ID: 12345</p>
              <p className="text-[12px] font-semibold">13 USDC</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
