"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  pin: z
    .string()
    .min(6, { message: "Password cannot be less than 6 characters" }),
});

export function PayNowBtn({
  handleOrder,
}: {
  handleOrder: (password: string) => Promise<void>;
}) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Dialog
        open={open}
        onOpenChange={setOpen}
        
      >
        <DialogTrigger asChild>
          <Button
            className="group bg-[var(--forest-green)] hover:bg-[var(--forest-green)]/90 rounded-full px-6 py-4 call_to_action_btn_text w-full cursor-pointer"
            // onClick={handleOrder}
          >
            Pay now
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] !border-none !outline-none">
          <DialogHeader>
            <DialogTitle>Confirm Payment</DialogTitle>
            <DialogDescription className="text-black/60">
              Note: your account password is your transaction pin
            </DialogDescription>
          </DialogHeader>
          <ProfileForm handleOrder={handleOrder} setOpen={setOpen}/>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
    >
      <DrawerTrigger asChild>
        <Button
          className="group bg-[var(--forest-green)] hover:bg-[var(--forest-green)]/90 px-6 py-4 call_to_action_btn_text w-full cursor-pointer"
          // onClick={handleOrder}
        >
          Pay now
        </Button>
      </DrawerTrigger>
      <DrawerContent className="!border-none !outline-none">
        <DrawerHeader className="text-left">
          <DrawerTitle>Confirm Payment</DrawerTitle>
          <DrawerDescription className="text-black/60">
            Note: your account password is your transaction pin
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm
          className="px-4"
          handleOrder={handleOrder}
          setOpen={setOpen}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button
              variant="outline"
              className="border-black"
            >
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({
  className,
  handleOrder,
  setOpen,
}: {
  className?: string;
  handleOrder: (password: string) => Promise<void>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    await handleOrder(value.pin)
    setOpen(false)
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid items-start gap-6 mt-3", className)}
      >
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[15px] font-medium">
                Transaction PIN
              </FormLabel>
              <FormControl>
                <Input
                  aria-label="PIN"
                  aria-describedby={`PIN-description`}
                  className="border-black  bg-transparent focus-visible:outline-none focus-visible:ring-0 text-[13px] font-medium text-[rgba(0,0,0,0.80)] tracking-wide"
                  type="password"
                  placeholder="e.g Jackblack1#"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-[12px] font-light italic text-black">
                input account password
              </FormDescription>
              <FormMessage id={`PIN-error`} />
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
            "Confirm"
          )}
        </Button>
      </form>
    </Form>
  );
}
