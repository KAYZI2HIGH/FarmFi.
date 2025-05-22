"use client";

import InputField from "@/components/InputField";
import { getRoleCookie } from "@/lib/actions";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BuyerRegister() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dob: "",
    address: "",
    nin: "",
    state: "",
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
      <h1 className="text-[22px] font-medium text-center">
        Join us to gain access to the best produce!
      </h1>
      <div className="form space-y-10">
        <div className="header">
          <h2 className="text-[var(--charcoal-black)] text-lg font-bold text-center">
            Create new account
          </h2>
        </div>
        <form
          className="flex flex-col gap-5 items-center"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-x-[117px]">
            <InputField
              label="First name"
              placeholder="first name"
              name="firstName"
              helperText="input first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <InputField
              label="Last name"
              placeholder="last name"
              name="lastName"
              helperText="input last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <InputField
              label="Email Address"
              placeholder="email address"
              name="email"
              helperText="input valid email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <InputField
              label="Phone number"
              placeholder="e.g: +234 *** *** ****"
              name="phoneNumber"
              helperText="phone number with country code"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <InputField
              label="Date of Birth"
              placeholder="dd/mm/yyyy"
              name="dob"
              helperText="input date of birth in this format"
              value={formData.dob}
              onChange={handleChange}
              required
            />
            <InputField
              label="Address"
              placeholder="house address"
              name="address"
              helperText="input your house address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <InputField
              label="National Identity Number"
              placeholder="NIN"
              name="nin"
              helperText="input your nin"
              value={formData.nin}
              onChange={handleChange}
              required
            />
            <InputField
              label="State"
              placeholder="state"
              name="state"
              helperText="input the state you live"
              value={formData.state}
              onChange={handleChange}
              required
            />
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
            value="Sign up"
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
