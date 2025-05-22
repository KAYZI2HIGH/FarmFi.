import { SidebarTrigger } from '@/components/ui/sidebar'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const page = () => {
  return (
    <section className="space-y-[40px] md:space-y-[60px] w-full px-5 lg:px-[60px] text-white">
      <div className="flex justify-center items-center relative">
        <SidebarTrigger className="absolute left-0 md:hidden text-black" />
        <h1 className="text-[15px] font-semibold text-black">Produce Listings</h1>
      </div>
      <div className="flex flex-row gap-[60px]">
<Link href={'/account/produce/new-listing'} className="max-w-[180px] w-full aspect-square flex flex-col items-center justify-center gap-6 bg-[rgba(109,76,65,0.60)] rounded-[10px] shadow hover:opacity-90">
          <Image
            src={"/icons/file.svg"}
            alt="file"
            width={50}
            height={50}
          />
          <h1 className="text-[15px] font-semibold max-w-[107px] text-center">
            Create New Listing
          </h1>
        </Link>
        <Link href={'/account/produce/manage-listing'} className="max-w-[180px] w-full aspect-square flex flex-col items-center justify-center gap-6 bg-[rgba(109,76,65,0.60)] rounded-[10px] shadow hover:opacity-90">
          <Image
            src={"/icons/white-folder.svg"}
            alt="file"
            width={50}
            height={50}
          />
          <h1 className="text-[15px] font-semibold max-w-[107px] text-center">
            Manage Listings
          </h1>
        </Link>
      </div>
    </section>
  );
}

export default page