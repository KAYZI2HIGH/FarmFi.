"use client";
import { FormImageUploader } from "@/components/custom-ui/FormImageUploader";
import ProfileAvatar from "@/components/custom-ui/ProfileAvater";
import { ResponsiveDialogBtn } from "@/components/custom-ui/ResponsiveDialogBtn";
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
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth, User } from "@/context/AuthContext";
// import { useWallet } from "@/context/WalletContext";
import { getBalance } from "@/lib/sui/sui-utils"
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { cn } from "@/lib/utils";
import { shortenText } from "@/utils/shortenText";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const editProfileFormSchema = z.object({
  name: z.string().min(6, { message: "Name must be at least 6 characters." }),
  email: z.string().email({ message: "Enter a valid email address." }),
  nationalIdentityNumber: z.string().min(11, {
    message: "Enter a valid National Identity Number.",
  }),
  profileImages: z
    .any()
    .refine((files) => files?.length > 0, "At least one image is required")
    .refine(
      (files) => files?.every((file: File) => file.size <= 10 * 1024 * 1024),
      "Each file must be less than 10MB"
    ),
});

const ProfilePage = () => {
  const [balance, setBalance] = useState(0);
  const { user } = useAuth();
  //user should be available by now
  const walletAddress = shortenText(user?.suiWalletAddress!, {
    maxLength: 14,
  });
  const updateProfile = useUpdateProfile();

  setBalance(getBalance(user?.suiWalletAddress))

  const {} = usequery

  const editHandleSubmit = async (values: z.infer<typeof editProfileFormSchema>) => {
    // const formData = new FormData()

    // formData.append("name", values.name)
    // formData.append("email", values.email)
    // formData.append("nin", values.nationalIdentityNumber)
    // formData.append("image", values.profileImages[0])

    const userUpdate: Partial<User> = {
      name: values.name,
      email: values.email,
      nin: values.nationalIdentityNumber,
      image: values.profileImages[0]
    };
    updateProfile.mutate(userUpdate);
  };

  return (
    <section className="space-y-[40px] md:space-y-[60px] w-full px-5 lg:px-[60px]">
      <div className="flex justify-center items-center relative">
        <SidebarTrigger className="absolute left-0 md:hidden text-black" />
        <h1 className="text-[15px] font-semibold text-black">User Profile</h1>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start gap-10">
        <div className="flex flex-col gap-12 max-w-[400px] w-full">
          <div className="flex justify-between gap-5">
            <div className="flex gap-2 items-center justify-center">
              <ProfileAvatar
                // eslint-disable-next-line
                image={user?.imgUrl!}
                // eslint-disable-next-line
                name={user?.name!}
                className="size-[60px]"
              />
              <div className="space-y-[10px]">
                <h1 className="text-[13px] font-semibold">{user?.name}</h1>
                <p className="text-[11px] font-medium tracking-wide">
                  {user?.email}
                </p>
              </div>
            </div>
            <ResponsiveDialogBtn
              submitFn={editHandleSubmit}
              triggerBtn={
                <Button
                  variant={"link"}
                  className="text-[10px] font-semibold tracking-wide cursor-pointer text-[#212121]/80"
                >
                  Edit Profile
                </Button>
              }
              CustomForm={EditProfileForm}
              dialogDescription="Update the your profile below and save your changes."
              dialogTitle=" Edit Profile"
            />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-[15px] font-bold tracking-wide">
                Wallet Balance
              </h1>
              <div className="flex gap-1 items-center justify-center">
                <p className="text-[11px] font-semibold tracking-wide">
                  {walletAddress}
                </p>
                <button className="cursor-pointer">
                  <Copy className="size-[14px]" />
                </button>
              </div>
            </div>
            <div className="flex gap-2 items-center justify-center w-fit mt-4">
              <Image
                src={"/icons/sui-currency.png"}
                height={20}
                width={20}
                alt="sui-currency"
              />
              <h1 className="text-[18px] font-medium">{ balance } USDC</h1>
            </div>
            <div className="flex gap-[80px] mt-5">
              <Button
                variant={"ghost"}
                className="text-[13px] font-semibold hover:bg-white/60 cursor-pointer"
              >
                Deposit{" "}
                <Image
                  src={"/icons/download_icon.svg"}
                  height={15}
                  width={14}
                  alt="download icon"
                />
              </Button>
              <Button
                variant={"ghost"}
                className="text-[13px] font-semibold flex items-center justify-center hover:bg-white/60 cursor-pointer"
              >
                Withdraw{" "}
                <Image
                  src={"/icons/withdraw.svg"}
                  height={22}
                  width={22}
                  alt="withdraw icon"
                />
              </Button>
            </div>
          </div>
        </div>
        <div className="max-w-[400px] w-full">
          <h1 className="text-[15px] font-bold tracking-wide">
            Transaction History
          </h1>
          <div className="mt-5 space-y-3">
            <div className="w-full flex justify-between items-center">
              <p className="text-[12px] font-semibold">Transaction ID: 12345</p>
              <p className="text-[12px] font-semibold">13 USDC</p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="text-[12px] font-semibold">Transaction ID: 12345</p>
              <p className="text-[12px] font-semibold">13 USDC</p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="text-[12px] font-semibold">Transaction ID: 12345</p>
              <p className="text-[12px] font-semibold">13 USDC</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;

function EditProfileForm({
  className,
  submitFn,
  setOpen,
}: {
  className?: string;
  //eslint-disable-next-line
  submitFn: (value: any) => Promise<void>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user } = useAuth();
  const form = useForm<z.infer<typeof editProfileFormSchema>>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      email: user?.email,
      name: user?.name,
      nationalIdentityNumber: user?.NIN,
      profileImages: [],
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (value: z.infer<typeof editProfileFormSchema>) => {
    await submitFn(value);
    setOpen(false);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid items-start gap-6 mt-3 w-full", className)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[15px] font-medium ">Name</FormLabel>
              <FormControl>
                <Input
                  aria-label="name"
                  aria-describedby={`name-description`}
                  className="border-black  bg-transparent focus-visible:outline-none focus-visible:ring-0 text-[13px] font-medium text-[rgba(0,0,0,0.80)] tracking-wide"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-[12px] font-light italic text-black">
                Enter your name.
              </FormDescription>
              <FormMessage id={`name-error`} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[15px] font-medium ">Email</FormLabel>
              <FormControl>
                <Input
                  aria-label="email"
                  aria-describedby={`email-description`}
                  className="border-black  bg-transparent focus-visible:outline-none focus-visible:ring-0 text-[13px] font-medium text-[rgba(0,0,0,0.80)] tracking-wide"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-[12px] font-light italic text-black">
                Enter your valid email.
              </FormDescription>
              <FormMessage id={`email-error`} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nationalIdentityNumber"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[15px] font-medium ">
                National Identity Number
              </FormLabel>
              <FormControl>
                <Input
                  aria-label="nationalIdentityNumber"
                  aria-describedby={`nationalIdentityNumber-description`}
                  className="border-black  bg-transparent focus-visible:outline-none focus-visible:ring-0 text-[13px] font-medium text-[rgba(0,0,0,0.80)] tracking-wide"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-[12px] font-light italic text-black">
                Enter your valid NIN.
              </FormDescription>
              <FormMessage id={`email-error`} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="profileImages"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[15px] font-semibold tracking-wide leading-[26px]">
                Profile Image
              </FormLabel>
              <FormControl>
                <FormImageUploader field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isSubmitting}
          type="submit"
          className="cursor-pointer bg-[var(--forest-green)] hover:bg-[var(--forest-green)]/90"
        >
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Save Changes"
          )}
        </Button>
      </form>
    </Form>
  );
}
