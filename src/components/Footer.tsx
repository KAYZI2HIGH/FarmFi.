import { footerInfos } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[rgba(109,76,65,0.7)] text-[rgba(244,244,244,0.90)] py-10 pt-16 px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-[1076px] mx-auto">
        {footerInfos.map((footer, idx) => (
          <div key={idx}>
            <h3 className="font-bold mb-4 text-[14px] capitalize">
              {footer.heading}
            </h3>
            <ul className="space-y-5 text-[14px] font-medium">
              {footer.content.type === "links"
                ? footer.content.keys.map((key, idy) => (
                    <li
                      key={idy}
                      className="hover:underline"
                    >
                      <Link href={key?.url || '/'}>{key.title}</Link>
                    </li>
                  ))
                : footer.content.keys.map((key, idz) => (
                    <li
                      key={idz}
                      className="capitalize"
                    >
                      {key.title}
                    </li>
                  ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10  max-w-[1076px] mx-auto">
        <div className="font-bold mb-2 text-[16px] flex gap-3 items-center tracking-wide">
          <Image
            src={"/logo/white-logo.svg"}
            height={32}
            width={35}
            alt="FarmFi Logo"
          />{" "}
          Agricultural Commodities Exchange on Blockchain Platform
        </div>
        <div className="text-white/80 text-center text-[16px] font-normal mt-5">
          © 2025 Commodities Exchange. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
