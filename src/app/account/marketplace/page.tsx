import SearchInput from "@/components/custom-ui/SearchInput";
import ProduceListingGrid from "@/components/ProduceListingGrid";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { crops } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ searchParams }: { searchParams: Promise<{ query: string }> }) => {
  const {query} = await searchParams
  return (
    <section className="space-y-[40px]  w-full px-5 lg:px-[60px]">
      <div className="flex justify-center items-center relative">
        <SidebarTrigger className="absolute left-0 md:hidden" />
        <h1 className="text-[15px] font-semibold">Marketplace</h1>
      </div>
      <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 justify-between items-center w-full max-w-[880px] mx-auto">
        <SearchInput query={query} />
        <div className="flex">
          <Button variant={"ghost"}>
            <Link href={"/account/profile"}>
              <Image
                src={"/icons/black_user.svg"}
                height={22}
                width={22}
                alt="user icon"
              />
            </Link>
          </Button>
          <Button variant={"ghost"}>
            <Link href={"/account/profile"}>
              <Image
                src={"/icons/setting_fill.svg"}
                height={22}
                width={22}
                alt="user icon"
              />
            </Link>
          </Button>
        </div>
      </div>
      <Tabs
        defaultValue="staple"
        className="w-full space-y-5"
      >
        <TabsList className="bg-transparent gap-2 md:gap-[70px] w-fit mx-auto">
          <TabsTrigger value="staple">Staple Crops</TabsTrigger>
          <TabsTrigger value="cash">Cash Crops</TabsTrigger>
          <TabsTrigger value="other">Other Crops</TabsTrigger>
        </TabsList>
        <TabsContent value="staple">
          <ProduceListingGrid
            query={query}
            crops={crops}
            filter="staple"
          />
        </TabsContent>
        <TabsContent value="cash">
          <ProduceListingGrid
            query={query}
            crops={crops}
            filter="cash"
          />
        </TabsContent>
        <TabsContent value="other">
          <ProduceListingGrid
            query={query}
            crops={crops}
            filter="other"
          />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default page;
