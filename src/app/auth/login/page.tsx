"use client";

import { useToast } from "@/components/custom-ui/toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export default function Login() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;
  
  if (isAuthenticated) {
    return router.push("/account/marketplace");
  }

  const Submit = async (values: z.infer<typeof formSchema>) => {
    const { email, password } = values;
    try {
      const response = await fetch(
        "https://farmfi-node.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      login(data.token);
      toast({
        message: "Login successfully!",
        duration: 3000,
      });
      router.push("/account/marketplace");
      // eslint-disable-next-line
    } catch (_err) {
      toast({
        message: "Something went wrong, please try again later!",
        duration: 3000,
      });
      throw new Error("Login failed");
    }
  };
  return (
    <div className="wrapper space-y-10 w-full">
      <h1 className="text-[22px] font-medium text-center">Welcome back!</h1>
      <div className="form flex flex-col gap-10 items-center">
        <h2 className="text-[var(--charcoal-black)] text-lg font-bold">
          Sign in to your account
        </h2>
        <Form {...form}>
          <form
            className="flex flex-col items-center space-y-10 w-[462px]"
            onSubmit={form.handleSubmit(Submit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[15px] font-medium">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      aria-label="email"
                      aria-describedby={`email-description`}
                      className="border-black border-0 border-b-[1.5] shadow-none outline-none bg-transparent focus-visible:outline-none focus-visible:ring-0   rounded-none text-[13px] font-medium text-[rgba(0,0,0,0.80)] tracking-wide px-0"
                      placeholder="input a valid email address."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-[12px] font-light italic text-black">
                    input already existing email address
                  </FormDescription>
                  <FormMessage id={`email-error`} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[15px] font-medium">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      aria-label="email"
                      aria-describedby={`email-description`}
                      className="border-black border-0 border-b-[1.5] shadow-none outline-none bg-transparent focus-visible:outline-none focus-visible:ring-0   rounded-none text-[13px] font-medium text-[rgba(0,0,0,0.80)] tracking-wide px-0"
                      type="password"
                      placeholder="input a valid email address."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-[12px] font-light italic text-black">
                    input your password
                  </FormDescription>
                  <FormMessage id={`password-error`} />
                </FormItem>
              )}
            />

            {/* <InputField
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
          /> */}
            <div className="flex flex-col gap-5 items-center w-full">
              <Button
                disabled={isSubmitting}
                className="group bg-[var(--forest-green)] hover:bg-[var(--forest-green)]/90  p-6 call_to_action_btn_text w-full cursor-pointer"
                type="submit"
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Submit
              </Button>
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
        </Form>
      </div>
    </div>
  );
}
