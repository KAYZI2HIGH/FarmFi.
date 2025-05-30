"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { buyerSidebarLinks, farmerSidebarLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


export function AppSidebar() {
  const pathname = usePathname();
  const {user,logout} = useAuth()

  const items = user?.role === "buyer" ? buyerSidebarLinks : farmerSidebarLinks;

  return (
    <Sidebar className="text-[#F4F4F4] font-semibold text-[15px] tracking-wide">
      <SidebarHeader className="pl-[30px] pt-[34px]">
        <Image
          src={"/logo/white-logo.svg"}
          height={35.85}
          width={32}
          alt="FarmFi Logo"
        />
      </SidebarHeader>
      <SidebarContent className="px-5 mt-5 hide_scrollbar">
        <SidebarMenu className="space-y-[15px]">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                className={cn(
                  "py-5 hover:bg-white/40 hover:text-white transition-all duration-200 ease-in-out",
                  pathname === item.url ? "bg-white/40" : ""
                )}
                asChild
              >
                <Link href={item.url}>
                  <div className="w-6 aspect-square relative">
                    <Image
                      src={item.icon}
                      fill
                      alt="logout icon"
                    />
                  </div>
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton
          onClick={() => {
           logout()
          }}
          className={
            "py-5 hover:bg-white/40 transition-all duration-200 ease-in-out flex justify-center hover:text-white cursor-pointer"
          }
        >
          <Image
            src={"/icons/back.svg"}
            height={24}
            width={24}
            alt="logout icon"
          />
          LogOut
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
