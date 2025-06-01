import OrderSummary from "@/components/sections/cart/OrderSummary";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCart } from "@/lib/actions";
import Image from "next/image";

import React, { Fragment } from "react";

const page = async () => {
  const cart = await getCart();

  return (
    <section className="space-y-[40px]  w-full md:h-[calc(100dvh-40px)] pl-5 pr-5 md:pr-0 pb-10 md:pb-0 lg:pl-[60px]">
      <div className="flex justify-center items-center relative">
        <SidebarTrigger className="absolute left-0 md:hidden" />
        <h1 className="text-[15px] font-semibold">Cart</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-5 h-[calc(100%-60px)]">
        <div className="w-full overflow-y-auto hide_scrollbar">
          <Table className="w-full h-full border-separate border-spacing-y-5">
            <TableHeader className="border-0 outline-0">
              <TableRow className="border-0 outline-0 ">
                <TableHead className="w-[130px]">Produce</TableHead>
                <TableHead className="w-[170px] text-center">Name</TableHead>
                <TableHead>Quantity (kg)</TableHead>
                <TableHead>Price (USDC)</TableHead>
              </TableRow>
            </TableHeader>
            {cart.length === 0 && (
              <TableCaption className="text-center">
                Your cart is empty
              </TableCaption>
            )}
            {cart.length > 0 &&
              cart.map((item, index) => (
                <Fragment key={index}>
                  <TableBody className="mt-2"></TableBody>
                  <TableBody className="!space-y-5 ">
                    <TableRow>
                      <TableCell className="font-medium relative aspect-square">
                        <Image
                          src={
                             Array.isArray(item.imgUrl)
                                ? item.imgUrl[0]
                                : item.imgUrl
                          }
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </TableCell>
                      <TableCell className="text-center">{item.name}</TableCell>
                      <TableCell className="text-center">
                        {item.weight}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.price}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Fragment>
              ))}
          </Table>
        </div>
        <OrderSummary cart={cart} />
      </div>
    </section>
  );
};

export default page;
