"use client";

import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

const FormReseButton = () => {
  const handleReset = () => {
    const form = document.querySelector(".search_form") as HTMLFormElement | null;

    if (form) form.reset();
  };

  return (
    <Link href={"/account/marketplace"} className=" flex items-center justify-center">
      <button
        onClick={handleReset}
        type="reset"
        className="cursor-pointer"
      >
        <X size={18} />
      </button>
    </Link>
  );
};

export default FormReseButton;
