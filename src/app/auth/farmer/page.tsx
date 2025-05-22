"use client";

import { poppins } from "@/lib/fonts";
import InputField from "@/components/InputField";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getRoleCookie } from "@/lib/actions";

export default function FarmerRegister() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dob: "",
    address: "",
    nin: "",
    state: "",
    password: "",
    confirmPassword: "",
    type: "",
    size: "",
    produce: "",
    farmadd: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const [role, setRole] = useState<string | undefined>();
 
   useEffect(() => {
     const fetchRole = async () => {
       const user_role = await getRoleCookie();
       setRole(user_role);
     };
     fetchRole();
   });

  return (
    <div className="wrapper space-y-10">
      <h1
        className={`${poppins.className} text-center text-[22px] font-medium`}
      >
        You are one step closer to the Global market!
      </h1>
      <div className="form space-y-10">
        <div className="header">
          <h2 className="text-[var(--charcoal-black)] text-lg text-center font-bold">
            Create new account
          </h2>
        </div>
        <form
          className="space-y-10 flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-x-[117px]">
            <InputField
              label="First name"
              placeholder="first name"
              helperText="input first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <InputField
              label="Last name"
              placeholder="last name"
              helperText="input last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <InputField
              label="Email Address"
              placeholder="email address"
              helperText="input valid email address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <InputField
              placeHolderClassName="italic"
              label="Phone number"
              placeholder="e.g: +234 *** *** ****"
              helperText="input phone number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <InputField
              label="Date of Birth"
              placeholder="dd/mm/yyyy"
              helperText="input date of birth in this format"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
            <InputField
              label="Address"
              placeholder="house address"
              helperText="input your house address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <InputField
              label="National Identity Number"
              placeholder="NIN"
              helperText="input your nin"
              name="nin"
              value={formData.nin}
              onChange={handleChange}
              required
            />
            <InputField
              label="State"
              placeholder="state"
              helperText="input the state you live"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
            <InputField
              label="Create Password"
              placeholder="must not be less than 8 digits"
              helperText="must contain letters, numbers & signs"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <InputField
              label="Re-enter Password"
              placeholder="password"
              helperText="rewrite password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <div className="details mt-10 space-y-[30px] col-span-2">
              <h3 className="text-black font-medium">Farm Details</h3>
              <div className="farm-details grid grid-cols-2 gap-x-[117px]">
                <InputField
                  label="Type"
                  placeholder="type of farm"
                  helperText="type such as grains, nuts, e.t.c"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Size"
                  placeholder="size in number"
                  helperText="input size in acres (number alone)"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Produce grown"
                  placeholder="e.g cocoa beans, maize, e.t.c"
                  helperText="input the produce you grow"
                  name="produce"
                  value={formData.produce}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Farm address"
                  placeholder="province/state"
                  helperText="input where your farm is located"
                  name="farmadd"
                  value={formData.farmadd}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <Link
            href={
              role === "buyer" ? "/account/marketplace" : "/account/produce"
            }
            className="bg-[var(--forest-green)] cursor-pointer text-white text-[15px] px-4 py-[13.5px] rounded-[60px]"
          >
            Sign up
          </Link>
          {/* <input
            type="submit"
            value={`Sign up`}
            className="bg-[var(--forest-green)] cursor-pointer text-white text-[15px] px-4 py-[13.5px] rounded-[60px]"
          /> */}
        </form>
        <p className="text-sm text-center text-[var(--charcoal-black)]">
          Already have an account?{" "}
          <Link
            className="font-bold"
            href="/"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
