"use client";
import BackButton from "@/components/custom-ui/BackButton";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ManageListingPage = () => {
  const [listings, setListings] = useState<StoredListing[]>([]);

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = () => {
    const storedListings = JSON.parse(localStorage.getItem("listings") || "[]");
    setListings(storedListings);
  };

  const deleteListing = (index: number) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) {
      return;
    }

    const updatedListings = [...listings];
    updatedListings.splice(index, 1);

    localStorage.setItem("listings", JSON.stringify(updatedListings));

    setListings(updatedListings);
  };

  return (
    <section className="space-y-[40px] md:space-y-[60px] w-full px-5 lg:px-[60px]">
      <div className="flex justify-center items-center relative">
        <BackButton className="absolute left-0" />
        <h1 className="text-[15px] font-semibold text-black">
          Manage Listings
        </h1>
      </div>
      {listings.length > 0 ? (
        <div className="border border-black rounded-[5px]">
          {listings.map((listing, idx) => (
            <div
              key={idx}
              className="flex flex-col-reverse sm:flex-row justify-between p-[10px] border-b border-black gap-5"
            >
              <div className="flex gap-7">
                <div className="w-[90px] relative overflow-hidden rounded-[5px]">
                  <Image
                    src={listing.produceImages[0].base64}
                    alt="produce-image"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="text-[14px] font-semibold capitalize">
                    {listing.produceName}
                  </h1>
                  <p className="text-[12px] capitalize">{listing.type}</p>
                  <p className="text-[12px] capitalize">{listing.quantity}kg</p>
                  <p className="text-[12px] capitalize">{listing.price} USDC</p>
                </div>
              </div>
              <div className="flex justify-between items-center gap-5 md:w-[273px]">
                <div className="border-2 border-[#2E7D32] rounded-[4px] bg-[rgba(243,243,243,0.35)] w-[90px] h-[35px] flex justify-center items-center text-[#2E7D32] font-semibold text-[13px]">
                  sold
                </div>
                <div className="flex gap-1">
                  <Button
                    variant={"ghost"}
                    className="hover:bg-white/10 cursor-pointer"
                  >
                    <Pencil />
                  </Button>
                  <Button
                    variant={"ghost"}
                    className="hover:bg-white/10 cursor-pointer"
                    onClick={() => deleteListing(idx)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="font-medium italic">
          Your listing is currently empty. To add a new listing{" "}
          <Link
            className="text-blue-900 underline"
            href={"/account/produce/new-listing"}
          >
            Click here
          </Link>
        </p>
      )}
    </section>
  );
};

export default ManageListingPage;
