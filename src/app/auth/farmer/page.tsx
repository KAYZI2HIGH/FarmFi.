"use client";

import { poppins } from "@/lib/fonts";
import Link from "next/link";
import {  useEffect, useState } from "react";
import { getRoleCookie } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { FarmersRegisterFormInputs } from "@/lib/constants";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formSchema } from "@/lib/schema/RegisterSchemaForFarmers";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/custom-ui/toast";

export default function FarmerRegister() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast()
  const [role, setRole] = useState<string | undefined>();

    if (isAuthenticated) {
      router.push('/account/marketplace')
    }

  useEffect(() => {
    const fetchRole = async () => {
      const user_role = await getRoleCookie();
      if (!user_role) {
        router.push("/auth");
      }
      setRole(user_role);
    };
    fetchRole();
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      address: "",
      nationalIdentityNumber: "",
      state: "",
      createPassword: "",
      reEnterPassword: "",
      type: "",
      size: null as unknown as number,
      produceGrown: "",
      farmAddress: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const {
      firstName,
      lastName,
      email,
      phone,
      // dateOfBirth,
      address,
      nationalIdentityNumber,
      state,
      createPassword,
      // reEnterPassword,
      type,
      size,
      produceGrown,
      farmAddress,
    } = values;
    try {
      const response = await fetch(
        "https://farmfi-node.onrender.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phoneNumber: phone,
            // dateOfBirth,
            role,
            address,
            nin: nationalIdentityNumber,
            state,
            password: createPassword,
            // reEnterPassword,
            farm: {
              type,
              size,
              produceGrown,
              address: farmAddress,
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      login(data.token);
      toast({
        message: "Account created successfully!",
        duration: 3000,
      });
      router.push("/account/produce");
      // eslint-disable-next-line
    } catch (_err) {
      toast({
        message: "Something went wrong, please try again later!",
        duration: 3000,
      });
      throw new Error("Login failed");
    }
  }

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 gap-8 w-full h-full pb-10">
              {FarmersRegisterFormInputs.map((input, idx) => {
                if (idx < 10) {
                  return (
                    <FormField
                      key={idx}
                      control={form.control}
                      name={input.name}
                      render={({ field }) => (
                        <FormItem className="w-full md:max-w-[300px] max-sm:col-span-2">
                          <FormLabel className="text-[15px] font-medium">
                            {input.title}
                          </FormLabel>
                          <FormControl>
                            <Input
                              aria-label={input.title}
                              aria-describedby={`${input.name}-description`}
                              className="border-black border-0 border-b-[1.5] shadow-none outline-none bg-transparent focus-visible:outline-none focus-visible:ring-0   rounded-none text-[13px] font-medium text-[rgba(0,0,0,0.80)] tracking-wide px-0"
                              type={input.title === "Price" ? "number" : "text"}
                              placeholder={input.placeholder}
                              {...field}
                            />
                          </FormControl>
                          {input.description && (
                            <FormDescription className="text-[12px] font-light italic text-black">
                              {input.description}
                            </FormDescription>
                          )}
                          <FormMessage id={`${input.name}-error`} />
                        </FormItem>
                      )}
                    />
                  );
                }
              })}
            </div>
            <h1 className="text-[16px] font-semibold tracking-wide my-10">
              Farm Details
            </h1>
            <div className="grid md:grid-cols-2 gap-8 w-full h-full pb-10">
              {FarmersRegisterFormInputs.map((input, idx) => {
                if (idx >= 10) {
                  return (
                    <FormField
                      key={idx}
                      control={form.control}
                      name={input.name}
                      render={({ field }) => (
                        <FormItem className="w-full md:max-w-[300px] max-sm:col-span-2">
                          <FormLabel className="text-[15px] font-medium">
                            {input.title}
                          </FormLabel>
                          <FormControl>
                            <Input
                              aria-label={input.title}
                              aria-describedby={`${input.name}-description`}
                              className="border-black border-0 border-b-[1.5] shadow-none outline-none bg-transparent focus-visible:outline-none focus-visible:ring-0   rounded-none text-[13px] font-medium text-[rgba(0,0,0,0.80)] tracking-wide px-0"
                              type={input.title === "Size" ? "number" : "text"}
                              placeholder={input.placeholder}
                              {...field}
                              onChange={
                                input.title === "Size"
                                  ? (e) =>
                                      field.onChange(e.target.valueAsNumber)
                                  : field.onChange
                              }
                            />
                          </FormControl>
                          {input.description && (
                            <FormDescription className="text-[12px] font-light italic text-black">
                              {input.description}
                            </FormDescription>
                          )}
                          <FormMessage id={`${input.name}-error`} />
                        </FormItem>
                      )}
                    />
                  );
                }
              })}
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-10 w-full col-span-2">
              <Button
                disabled={isSubmitting}
                className="group bg-[var(--forest-green)] hover:bg-[var(--forest-green)]/90  p-6 call_to_action_btn_text"
                type="submit"
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Submit
              </Button>
            </div>
          </form>
        </Form>
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
