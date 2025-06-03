"use client";

import * as React from "react";
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

type ResponsiveDialogBtnProps = {
  dialogTitle: string;
  dialogDescription: string;
  triggerBtn: React.ReactNode;
  CustomForm: React.ComponentType<{
    // eslint-disable-next-line
    submitFn: (value: any) => Promise<void>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    className?: string;
    defaultValues?: Crop
  }>;
  // eslint-disable-next-line
  submitFn: (value: any) => Promise<void>;
  formDefaultValues?: Crop
};

export function ResponsiveDialogBtn({
  dialogTitle,
  dialogDescription,
  triggerBtn,
  submitFn,
  CustomForm,
  formDefaultValues,
}: ResponsiveDialogBtnProps) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogTrigger asChild>{triggerBtn}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-h-[435px] !border-none !outline-none overflow-y-scroll hide_scrollbar">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription className="text-black/60">
              {dialogDescription}
            </DialogDescription>
          </DialogHeader>
          <CustomForm
            submitFn={submitFn}
            setOpen={setOpen}
            defaultValues={formDefaultValues}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
    >
      <DrawerTrigger asChild>{triggerBtn}</DrawerTrigger>
      <DrawerContent className="!border-none !outline-none">
        <DrawerHeader className="text-left">
          <DrawerTitle>{dialogTitle}</DrawerTitle>
          <DrawerDescription className="text-black/60">
            {dialogDescription}
          </DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-scroll h-full hide_scrollbar">
          <CustomForm
            className="px-4"
            submitFn={submitFn}
            setOpen={setOpen}
            defaultValues={formDefaultValues}
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
        </div>
      </DrawerContent>
    </Drawer>
  );
}
