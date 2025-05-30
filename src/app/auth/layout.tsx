import Image from "next/image";
import { poppins } from "@/lib/fonts";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <div
      className={`bg-[var(--background)] min-h-screen flex w-full ${poppins.className}`}
    >
      <div className="image-container hidden md:flex md:relative bg-cover bg-center w-2/5">
        <Image src={"/person.png"} fill alt="logo" className="object-cover" />
      </div>
      <div className="flex-1 flex flex-col gap-10 items-center justify-center p-8 bg-[var(--background)]">
        {children}
      </div>
    </div>
  );
}
