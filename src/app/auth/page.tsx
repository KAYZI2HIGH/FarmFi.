import { Button } from "@/components/ui/button";
import { setRoleCookie } from "@/lib/actions";
import { poppins } from "@/lib/fonts";
import Link from "next/link";

export default function Roles() {
  return (
    <div className="wrapper">
      <div className="flex flex-col gap-10 items-center justify-center p-8 bg-[var(--background)]">
        <p className={`${poppins.className} text-[22px] font-medium`}>
          What do you want to use FarmFi as?
        </p>
        <div
          className={`buttons flex flex-col gap-5 w-full md:w-[400px] ${poppins.className} font-semibold text-lg text-white`}
        >
          <form
            action={async () => {
              "use server";
              setRoleCookie("farmer");
            }}
          >
            <Button
              type="submit"
              className="flex !py-[25px] rounded-[30px] text-center bg-[var(--forest-green)] hover:bg-[var(--forest-green)]/90 w-full font-semibold text-lg"
              asChild
            >
              <Link href={"/auth/farmer"}>Farmer</Link>
            </Button>
          </form>
          <form
            action={async () => {
              "use server";
              setRoleCookie("buyer");
            }}
          >
            <Button
              type="submit"
              className="flex !py-[25px] rounded-[30px] text-center bg-[var(--chestnut-brown)] hover:bg-[var(--chestnut-brown)]/90 w-full font-semibold text-lg"
              asChild
            >
              <Link href={"/auth/buyer"}>Buyer</Link>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
