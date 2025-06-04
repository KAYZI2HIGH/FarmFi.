"use client";
import BackButton from "@/components/custom-ui/BackButton";
import { FormImageUploader } from "@/components/custom-ui/FormImageUploader";
import { ResponsiveDialogBtn } from "@/components/custom-ui/ResponsiveDialogBtn";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { getAllProduce } from "@/lib/actions";
import { editFormInputs } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const editFormSchema = z.object({
  id: z.string(),
  name: z.string().min(2, {
    message: "Produce name must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "Please enter either cash crop, staple crop or other.",
  }),
  description: z.string().min(200, {
    message: "Your description should exceed 200 characters.",
  }),
  weight: z.number().positive({
    message: "weight can only be a positive number.",
  }),
  price: z.number().positive({
    message: "Price must be positive",
  }),
  produceImages: z
    .any()
    // .optional()
    // .refine((files) => files?.length > 0, "At least one image is required")
    .refine(
      (files) => files?.every((file: File) => file.size <= 10 * 1024 * 1024),
      "Each file must be less than 10MB"
    ),
});

const deleteFormSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    confirmDelete: z.string(),
  })
  .refine((data) => data.confirmDelete.toLowerCase() === "delete my produce", {
    message: "The verification text is required",
    path: ["confirmDelete"],
  });

const ManageListingPage = () => {
  const { toast } = useToast();
  const { data: rawListings, isLoading } = useQuery({
    queryKey: ["produce"],
    queryFn: () => getAllProduce(),
  });

  const { user } = useAuth();

  const listings = rawListings?.filter(
    (item) => user?._id === item.farmer?._id
  );

  const queryClient = useQueryClient();

  const editHandleSubmit = async (values: z.infer<typeof editFormSchema>) => {
    const { id, name, price, category, description, weight, produceImages } =
      values;
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price.toString());
      formData.append("stock", weight.toString());
      formData.append("category", category);
      formData.append("weight", weight.toString());
      formData.append("image", produceImages[0]);
      const response = await fetch(
        `https://farmfi-node.onrender.com/product/update/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "something went wrong");
      }

      toast({
        message: "Produce updated successfully.",
        duration: 3000,
      });

      queryClient.invalidateQueries({ queryKey: ["produce"] });
      // eslint-disable-next-line
    } catch (_err) {
      toast({
        message: "Something went wrong, please try again later!",
        duration: 3000,
      });
      throw new Error("Update failed");
    }
  };

  const deleteHandleSubmit = async (values: z.infer<typeof deleteFormSchema>) => {
    const { id, name } = values;
    try {
      const formData = new FormData()

      formData.append("name", name)

      const response = await fetch(
        `https://farmfi-node.onrender.com/product/delete/${id}`,
        {
          method: "DELETE",
          body: formData
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "something went wrong");
      }

      toast({
        message: "Produce deleted successfully.",
        duration: 3000,
      });

      queryClient.invalidateQueries({ queryKey: ["produce"] });
      // eslint-disable-next-line
    } catch (_err) {
      toast({
        message: "Something went wrong, please try again later!",
        duration: 3000,
      });
      throw new Error("delete failed");
    }
  }

  return (
    <section className="space-y-[40px] md:space-y-[60px] w-full px-5 lg:px-[60px]">
      <div className="flex justify-center items-center relative">
        <BackButton className="absolute left-0" />
        <h1 className="text-[15px] font-semibold text-black">
          Manage Listings
        </h1>
      </div>
      {isLoading ? (
        <div className="border border-black rounded-[5px]">
          <div className="flex flex-col-reverse sm:flex-row justify-between p-[10px] border-b border-black gap-5">
            <Skeleton className="w-full h-[100px] bg-black/20" />
          </div>
          <div className="flex flex-col-reverse sm:flex-row justify-between p-[10px] border-b border-black gap-5">
            <Skeleton className="w-full h-[100px] bg-black/20" />
          </div>
          <div className="flex flex-col-reverse sm:flex-row justify-between p-[10px] border-b border-black gap-5">
            <Skeleton className="w-full h-[100px] bg-black/20" />
          </div>
          <div className="flex flex-col-reverse sm:flex-row justify-between p-[10px] border-b border-black gap-5">
            <Skeleton className="w-full h-[100px] bg-black/20" />
          </div>
        </div>
      ) : listings && listings!.length > 0 ? (
        <div className="border border-black rounded-[5px]">
          {listings?.map((listing, idx) => (
            <div
              key={idx}
              className="flex flex-col-reverse sm:flex-row justify-between p-[10px] border-b border-black gap-5"
            >
              <div className="flex gap-7">
                <div className="w-[90px] relative overflow-hidden rounded-[5px]">
                  <Image
                    // src={listing.produceImages[0].base64}
                    src={listing.imgUrl[0]}
                    alt="produce-image"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="text-[14px] font-semibold capitalize">
                    {listing.name}
                  </h1>
                  <p className="text-[12px] capitalize">{listing.category}</p>
                  <p className="text-[12px] capitalize">{listing.weight}kg</p>
                  <p className="text-[12px] capitalize">{listing.price} USDC</p>
                </div>
              </div>
              <div className="flex justify-between items-center gap-5 md:w-[273px]">
                <div className="border-2 border-[#2E7D32] rounded-[4px] bg-[rgba(243,243,243,0.35)] w-[90px] h-[35px] flex justify-center items-center text-[#2E7D32] font-semibold text-[13px]">
                  sold
                </div>
                <div className="flex gap-1">
                  <ResponsiveDialogBtn
                    submitFn={editHandleSubmit}
                    triggerBtn={
                      <Button
                        variant={"ghost"}
                        className="hover:bg-white/10 cursor-pointer"
                      >
                        <Pencil />
                      </Button>
                    }
                    CustomForm={EditForm}
                    dialogDescription="Update the product details below and save your changes."
                    dialogTitle=" Edit Product"
                    formDefaultValues={listing}
                  />
                  <ResponsiveDialogBtn
                    submitFn={deleteHandleSubmit}
                    triggerBtn={
                      <Button
                        variant={"ghost"}
                        className="hover:bg-red-500/10 hover:text-red-600 cursor-pointer text-red-500"
                        // onClick={() => deleteListing(idx)}
                      >
                        <Trash2 />
                      </Button>
                    }
                    CustomForm={DeleteForm}
                    dialogDescription="This project will be deleted, along with all of it's information and images on our database."
                    dialogTitle="Delete Product"
                    formDefaultValues={listing}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="relative w-52 aspect-square">
            <Image
              src={"/illustrators/empty.svg"}
              fill
              alt="empty image"
            />
          </div>
          <p className="font-medium italic">
            Your listing is currently empty. To add a new listing{" "}
            <Link
              className="text-blue-900 underline"
              href={"/account/produce/new-listing"}
            >
              Click here
            </Link>
          </p>
        </div>
      )}
    </section>
  );
};

export default ManageListingPage;

function EditForm({
  className,
  submitFn,
  setOpen,
  defaultValues,
}: {
  className?: string;
  //eslint-disable-next-line
  submitFn: (value: any) => Promise<void>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValues?: Crop;
}) {
  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      id: defaultValues?._id,
      name: defaultValues?.name,
      category: defaultValues?.category,
      description: defaultValues?.description,
      price: defaultValues?.price,
      weight: defaultValues?.weight,
      produceImages: [],
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (value: z.infer<typeof editFormSchema>) => {
    await submitFn(value);
    setOpen(false);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid items-start gap-6 mt-3 w-full", className)}
      >
        {editFormInputs.map((input, idx) => (
          <FormField
            key={idx}
            control={form.control}
            name={input.name}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-[15px] font-medium">
                  {input.title}
                </FormLabel>
                <FormControl>
                  <Input
                    aria-label={input.name}
                    aria-describedby={`${input.name}-description`}
                    className="border-black  bg-transparent focus-visible:outline-none focus-visible:ring-0 text-[13px] font-medium text-[rgba(0,0,0,0.80)] tracking-wide"
                    placeholder={input.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-[12px] font-light italic text-black">
                  {input.description}
                </FormDescription>
                <FormMessage id={`PIN-error`} />
              </FormItem>
            )}
          />
        ))}

        <FormField
          control={form.control}
          name="produceImages"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[15px] font-semibold tracking-wide leading-[26px]">
                Produce Image
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

function DeleteForm({
  className,
  submitFn,
  setOpen,
  defaultValues
}: {
  className?: string;
  //eslint-disable-next-line
  submitFn: (value: any) => Promise<void>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValues?: Crop;
}) {
  const form = useForm<z.infer<typeof deleteFormSchema>>({
    resolver: zodResolver(deleteFormSchema),
    defaultValues: {
      id: defaultValues?._id,
      name: defaultValues?.name,
      confirmDelete: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (value: z.infer<typeof deleteFormSchema>) => {
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
          name="confirmDelete"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[15px] font-medium ">Delete</FormLabel>
              <FormControl>
                <Input
                  aria-label="delete"
                  aria-describedby={`delete-description`}
                  className="border-black  bg-transparent focus-visible:outline-none focus-visible:ring-0 text-[13px] font-medium text-[rgba(0,0,0,0.80)] tracking-wide"
                  placeholder="Warning: This action is not reversible. Please be certain."
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-[12px] font-light italic text-black">
                To verify, type{" "}
                <span className="text-red-700">delete my produce</span> above.
              </FormDescription>
              <FormMessage id={`delete-error`} />
            </FormItem>
          )}
        />
        <Button
          disabled={isSubmitting}
          type="submit"
          className="cursor-pointer bg-red-600 hover:bg-red-600/70"
        >
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Delete"
          )}
        </Button>
      </form>
    </Form>
  );
}
