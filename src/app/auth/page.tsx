
import { poppins } from "@/lib/fonts";
import Link from "next/link";

export default function Roles(){
    return(
        <div className="wrapper">
            <div className="flex flex-col gap-10 items-center justify-center p-8 bg-[var(--background)]">
                <p className={`${poppins.className} text-[22px] font-medium`}>What do you want to use FarmFi as?</p>
                <div className={`buttons flex flex-col gap-5 w-full md:w-[400px] ${poppins.className} font-semibold text-lg text-white`}>
                    <Link className="py-[10px] rounded-[30px] text-center bg-[var(--forest-green)]" href={"/auth/farmer"}>Farmer</Link>
                    <Link className="py-[10px] rounded-[30px] text-center bg-[var(--chestnut-brown)]" href={"/auth/buyer"}>Buyer</Link>
                </div>
            </div>
        </div>
    )
}
