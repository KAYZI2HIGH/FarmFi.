"use client";

import InputField from "@/components/InputField";
import { getRoleCookie } from "@/lib/actions";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Login() {
  const [role, setRole] = useState<string | undefined>();

  useEffect(() => {
    const fetchRole = async () => {
      const user_role = await getRoleCookie();
      setRole(user_role);
    };
    fetchRole();
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="wrapper space-y-10">
      <h1 className="text-[22px] font-medium text-center">Welcome back!</h1>
      <div className="form flex flex-col gap-10 items-center">
        <h2 className="text-[var(--charcoal-black)] text-lg font-bold">
          Sign in to your account
        </h2>
        <form
          className="flex flex-col items-center space-y-10"
          onSubmit={handleSubmit}
        >
          <InputField
            width="w-[462px]"
            helperText="input already existing email address"
            label="Email Address"
            placeholder="email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
          />
          <InputField
            width="w-[462px]"
            helperText="input your password"
            label="Password"
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
          />
          <div className="flex flex-col gap-5 items-center">
            <Link
              href={
                role === "buyer" ? "/account/marketplace" : "/account/produce"
              }
              className="bg-[var(--forest-green)] cursor-pointer text-white text-[15px] px-4 py-[13.5px] rounded-[60px]"
            >
              Sign in
            </Link>
            {/* <input
              type="submit"
              value="Sign in"
              className="bg-[var(--forest-green)] cursor-pointer text-white text-[15px] px-[19.5px] py-[13.5px] rounded-[60px]"
            /> */}
            <p className="text-sm text-center text-[var(--charcoal-black)]">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth"
                className="font-bold"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
