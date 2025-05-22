import BackButton from "@/components/custom-ui/BackButton";
import LockedFunds from "@/components/LockedFunds";
import ReleasedFunds from "@/components/ReleasedFunds";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import React from "react";

const page = () => {
  return (
    <section className="space-y-[40px] w-full px-5 lg:px-[60px]">
      <div>
        <div className="flex justify-center items-center relative">
          <BackButton className="absolute left-0" />
          <h1 className="text-[15px] font-semibold text-black">
            Escrow Funds Tracker
          </h1>
        </div>
        <p className="max-w-[760px] text-[17px] font-normal text-[#212121] mt-7">
          Note: Payment will be released upon confirmation of delivery by the
          logistics company. Please, be rest assured that your money is safe in
          the Escrow system.
        </p>
      </div>
      <Tabs
        defaultValue="locked"
        className="w-full space-y-3"
      >
        <TabsList className="bg-transparent gap-2 md:gap-[70px] w-fit mx-auto">
          <TabsTrigger
            value="locked"
            className="text-[15px] tracking-wide"
          >
            Locked
          </TabsTrigger>
          <TabsTrigger
            value="released"
            className="text-[15px] tracking-wide"
          >
            Released
          </TabsTrigger>
        </TabsList>
        <TabsContent value="locked">
          <LockedFunds />
        </TabsContent>
        <TabsContent value="released">
          <ReleasedFunds />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default page;
