'use client'
import { Button } from '../ui/button';
import { useTransition } from 'react';
import { addToCart } from '@/lib/actions';
import { useRouter } from 'next/navigation';

const AddToCartBtn = ({ produce }: { produce: Crop }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAddToCart = () => {
    startTransition(async () => {
      await addToCart(produce);
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