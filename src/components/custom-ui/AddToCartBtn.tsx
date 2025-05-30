'use client'
import { Button } from '../ui/button';
import { useTransition } from 'react';
import { addToCart } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { useToast } from './toast';

const AddToCartBtn = ({ produce }: { produce: Crop }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {toast} = useToast()

  const handleAddToCart = () => {
    startTransition(async () => {
      await addToCart(produce);
      toast({
        message: `${produce.name} has been added to your cart`,
        duration: 3000
      })
      router.refresh();
    });
  };
  return (
    <Button
      onClick={handleAddToCart}
      disabled={isPending}
      className="group bg-[var(--forest-green)] hover:bg-[var(--forest-green)]/90 rounded-full px-6 py-6 call_to_action_btn_text cursor-pointer"
    >
      {isPending ? "Adding..." : "Add to Cart"}
    </Button>
  );
}

export default AddToCartBtn