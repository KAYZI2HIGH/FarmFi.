"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { setRoleCookie } from "@/lib/actions";
import { poppins } from "@/lib/fonts";
import { useRouter } from "next/navigation";

export default function Roles() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    router.push("/account/marketplace");
  }

  return (
    <div className="wrapper">
      <div className="flex flex-col gap-10 items-center justify-center p-8 bg-[var(--background)]">
        <p className={`${poppins.className} text-[22px] font-medium`}>
          What do you want to use FarmFi as?
        </p>
        <div
          className={`buttons flex flex-col gap-5 w-full md:w-[400px] ${poppins.className} font-semibold text-lg text-white`}
        >
          <Button
            onClick={() => {
              setRoleCookie("farmer");
              router.push("/auth/farmer");
            }}
            type="submit"
            className="flex !py-[25px] rounded-[30px] text-center bg-[var(--forest-green)] hover:bg-[var(--forest-green)]/90 w-full font-semibold text-lg cursor-pointer"
          >
            Farmer
          </Button>
          <Button
            onClick={() => {
              setRoleCookie("buyer");
              router.push("/auth/buyer");
            }}
            type="submit"
            className="flex !py-[25px] rounded-[30px] text-center bg-[var(--chestnut-brown)] hover:bg-[var(--chestnut-brown)]/90 w-full font-semibold text-lg cursor-pointer"
          >
            Buyer
          </Button>
        </div>
      </div>
    </div>
  );
}
