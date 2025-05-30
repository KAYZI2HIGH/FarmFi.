"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { FormImageUploader } from "./FormImageUploader";
import { Button } from "../ui/button";
import Link from "next/link";
import { formSchema } from "@/lib/schema/NewListingSchema";
import { FormInputs } from "@/lib/constants";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { saveListing } from "@/utils/storage";
import { useRouter } from "next/navigation";

export function NewListingForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      produceName: "",
      type: "",
      quantity: "",
      price: null as unknown as number,
      harvestDate: "",
      expiryDate: "",
      farmerContact: "",
      farmLocation: "",
      produceImages: [],
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    saveListing(values)
      .then(() => {
        toast.success("Saved successfully!", {
          className: "bg-[#FBC02D] text-black",
        });
        router.push("/account/produce/manage-listing");
      })
      .catch((error) => {
        toast.error("Failed to save");
        console.log(error);
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid md:grid-cols-2 gap-8 w-full h-full pb-10"
      >
        {FormInputs.map((input, idx) => (
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
                    onChange={
                      input.title === "Price"
                        ? (e) => field.onChange(e.target.valueAsNumber)
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
        ))}
        <FormField
          control={form.control}
          name="produceImages"
          render={({ field }) => (
            <FormItem className="col-span-2">
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
          <Button
            variant={"outline"}
            className="border-[var(--forest-green)] text-[var(--forest-green)] hover:bg-[var(--forest-green)]/10  p-6 call_to_action_btn_text"
            asChild
          >
            <Link href={"/account/produce"}>Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
