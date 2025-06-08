"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useWallet } from "@/context/WalletContext";
import { useAuth } from "@/context/AuthContext";
import { ResponsiveDialogBtn } from "@/components/custom-ui/ResponsiveDialogBtn";
import { useToast } from "@/components/custom-ui/toast";
import { clearCart } from "@/lib/actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { extractPayment } from "@/lib/sui/sui-utils";
import { Transaction } from "@mysten/sui/transactions";
import { network } from "@/lib/sui/sui-constants";
import { fromBase64 } from "@mysten/sui/utils"

const formSchema = z.object({
  pin: z
    .string()
    .min(6, { message: "Password cannot be less than 6 characters" }),
});

const OrderSummary = ({ cart }: { cart: Crop[] }) => {
  const { toast } = useToast();
  // const [tx, setTx] = useState();

  // Importing the variables for signing transactions
  const { initWallet, keypair, suiClient } = useWallet();
  const { user } = useAuth()

  //to bypass unsued variable check
  console.log(keypair?.getPublicKey().toSuiAddress() == user?.suiWalletAddress);

  const total = cart.reduce(
    (total, item) => total + item.price * item.weight,
    0
  );

  const queryClient = useQueryClient()


  const handleOrder = async (password: string) => {
    try {    
      console.log("sending");
      //initialize wallet and get keypair
      const walletKeypair = await initWallet(password)
      // console.log(keypair, total, walletInitResponse)
    
      if(!walletKeypair){
        //handle wrong password
        toast({
          message: "Wrong passwword.",
          duration: 3000,
        });
        return
      } 

      const paymentCoin = await extractPayment(total, walletKeypair)

      // reset cookie
      queryClient.invalidateQueries({queryKey: ["balance"]})

      const res = await fetch("https://farmfi-node.onrender.com/order/create", {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          buyer:user?.email,
          products: cart,
          price: total,
          payment: paymentCoin,
        })
      })

      if(!res.ok || res.status !== 200){
        toast({message:"Error creating transaction block", duration:2000})
        return
      }
      const { serializedTransaction: txBytesB64, order_id } = await res.json()
      const txBytes = fromBase64(txBytesB64)
      const tx = Transaction.from(txBytes)
      const { digest } = await suiClient.signAndExecuteTransaction({
        transaction: tx,
        signer: walletKeypair,
        options: {
          showObjectChanges: true,
          showEvents: true,
        }
      })

      console.log(digest)

      const response = await suiClient.waitForTransaction({ digest })
      console.log(response)
      toast({message:`order escrow created at ${order_id} on ${network}`, duration:4000})


      //will later also clear the wallet  context, once transaction is done
      await clearCart();
    } catch (err) {
      toast({
        message: "Payment failed. Please try again later",
        duration: 3000,
      });
      throw new Error(`Payment failed: ${err}`);
    }
  };

  return (
    <div className="py-[25px] space-y-4 px-4 bg-[rgba(109,_76,_65,_0.60)] w-full md:max-w-[357px]  text-white overflow-y-auto hide_scrollbar">
      <div className="pb-5  border-b border-white">
        <h1 className="text-[14px] font-semibold text-center">Order Summary</h1>
      </div>
      <div className="space-y-6 border-b border-white pb-5 px-[25px] ">
        <div className="flex justify-between items-center">
          <h1 className="text-[15px] font-semibold">Produce ({cart.length})</h1>
          <h1 className="text-[15px] font-semibold">{total} USDC</h1>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-[15px] font-semibold">Location</h1>
          <Button
            variant={"link"}
            className="font-medium text-[#CACACC] text-[12.5px] cursor-pointer"
          >
            Change
          </Button>
        </div>
      </div>
      <div className="space-y-[10px] border-b border-white pb-5 px-[25px] ">
        <h1 className="text-[12.5px] font-semibold">Olayinka Ayodele</h1>
        <h1 className="text-[12.5px] font-medium">
          No 59, Kashamawu street, Ikeja | Lagos
        </h1>
      </div>
      <div className="border-b border-white pb-5 px-[25px] flex justify-between items-center">
        <h1 className="text-[12.5px] font-semibold">Delivery Detials</h1>
        <Button
          variant={"link"}
          className="font-medium text-[#CACACC] text-[12.5px] cursor-pointer"
        >
          Change
        </Button>
      </div>
      <div className="space-y-10 border-b border-white pb-5 px-[25px] ">
        <div className="flex justify-between items-center">
          <h1 className="text-[15px] font-semibold">Logistics Details</h1>
          <h1 className="text-[15px] font-semibold">Fulflled by DHL</h1>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-[15px] font-semibold">Delivery Fee</h1>
          <h1 className="text-[15px] font-semibold">6 USDC</h1>
        </div>
      </div>
      <div className="flex justify-between items-center px-[25px]">
        <h1 className="text-[15px] font-semibold">Total</h1>
        <h1 className="text-[15px] font-semibold">{total + 6} USDC</h1>
      </div>
      <ResponsiveDialogBtn
        submitFn={handleOrder}
        triggerBtn={
          <Button
            className="group bg-[var(--forest-green)] hover:bg-[var(--forest-green)]/90 rounded-full px-6 py-4 call_to_action_btn_text w-full cursor-pointer"
            // onClick={submitFn}
          >
            Pay now
          </Button>
        }
        CustomForm={CustomForm}
        dialogDescription="Note: your account password is your transaction pin"
        dialogTitle="Confirm Password"
      />
    </div>
  );
};

export default OrderSummary;

function CustomForm({
  className,
  submitFn,
  setOpen,
}: {
  className?: string;
  submitFn: (password: string) => Promise<void>;
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
    await submitFn(value.pin);
    setOpen(false);
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

