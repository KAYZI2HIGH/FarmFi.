import { Input } from "@/components/ui/input";
import { Rating } from "@mui/material";
import Image from "next/image";
import React from "react";
import ProduceCard from "@/components/custom-ui/ProduceCard";
import { notFound } from "next/navigation";
import AddToCartBtn from "@/components/custom-ui/AddToCartBtn";
import BackButton from "@/components/custom-ui/BackButton";
import { getAllProduce } from "@/lib/actions";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const crops = await getAllProduce()
  const crop = crops.find((crop) => crop._id === id);
  if (!crop) {
    return notFound();
  }
  return (
    <section>
      <section className="space-y-[40px] md:space-y-[60px] w-full px-5 lg:px-[60px]">
        <div className="flex justify-center items-center relative">
          <BackButton className="absolute left-0 " />
          <h1 className="text-[15px] font-semibold">Marketplace</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="relative min-w-[250px] md:aspect-square aspect-video rounded-[12px] overflow-hidden">
            <Image
              src={crop.imgUrl[0]}
              alt="produce image"
              className="object-cover"
              fill
            />
          </div>
          <div className="flex justify-between gap-8 w-full">
            <div className="flex flex-col max-md:gap-5 justify-between">
              <div>
                <h1 className="text-[18px] font-medium">{crop.name}</h1>
                <p className="text-[16px] font-semibold uppercase">
                  {crop.price} USDC
                </p>
              </div>
              <div>
                <p className="text-[12px] font-medium">Quantity</p>
                <div className="w-[84px] relative mt-1">
                  <p className="w-fit text-[12px] font-semibold absolute left-3 top-0 translate-y-1/2">
                    Kg
                  </p>
                  <Input
                    type="number"
                    className="w-full border border-black pl-8 py-2  text-[12px] rounded-[5px] focus:outline-none focus:ring-1 focus:ring-black  text-black/70"
                    defaultValue={0}
                  />
                </div>
                <p className="text-[11px] italic mt-[2px]">
                  Input desired quantity
                </p>
              </div>
              <div>
                <h1 className="text-[14px]">
                  <span className="font-semibold">Seller:</span>{" "}
                {crop.farmer?.name}
                </h1>
                <h1 className="text-[14px]">
                  <span className="font-semibold">Location:</span>{" "}
                  {crop.location}
                </h1>
              </div>
            </div>
            <AddToCartBtn produce={crop} />
          </div>
        </div>
        <div className="flex flex-col gap-4 max-w-[804px]">
          <h1 className="text-[15px] font-bold tracking-wide">
            Item Description
          </h1>
          <div className="p-[10px] border border-black rounded-[5px] shadow">
            <p className="text-[13px] font-medium max-w-[735px]">
              {crop.description}
            </p>
          </div>
        </div>
        {crop.reviews.length !== 0 && (
          <div className="space-y-[10px]">
            <div className="border-b border-black pb-5">
              <div className="flex gap-2 items-center">
                <p className="text-[14px] font-bold tracking-wide">
                  {crop.rating}
                </p>
                <Rating
                  defaultValue={crop.rating}
                  precision={0.5}
                  size="small"
                  className="!text-black"
                  readOnly
                />
              </div>
              <h1 className="text-[15px] font-bold tracking-wide mt-1">
                Produce Reviews
              </h1>
            </div>
            {crop.reviews.map((review, idx) => (
              <div
                key={idx}
                className="border-b border-[#212121] pb-[15px]"
              >
                <h3 className="text-[14px] font-semibold">{review.author}</h3>
                <p className="text-[13px] font-medium max-w-[700px]">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        )}
        <div className="space-y-[10px]">
          <h1 className="text-[15px] font-semibold">
            Explore more commodities
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-14 gap-y-8 place-items-center">
            {crops.map((crop, idx) => {
              if (idx < 4) {
                return (
                  <div key={`${crop.name}-${idx}`}>
                    <ProduceCard crop={crop} />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </section>
    </section>
  );
};

export default page;
