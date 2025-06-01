import BackButton from "@/components/custom-ui/BackButton";
import { NewListingForm } from "@/components/custom-ui/Form";
import React from "react";

const page = () => {
  return (
    <section className="space-y-[40px] md:space-y-[60px] w-full px-5 lg:px-[60px] ">
      <div className="flex justify-center items-center relative">
        <BackButton className="absolute left-0" />
        <h1 className="text-[15px] font-semibold text-black">
          List New Listings
        </h1>
      </div>
      <NewListingForm />
    </section>
  );
};

export default page;
