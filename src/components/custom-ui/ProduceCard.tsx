"use client";
import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Link from "next/link";

const ProduceCard = ({ crop }: { crop: Crop }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radius = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
    radius.set(Math.sqrt(width * height) / 2);
  };

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, #84635827, transparent 80%)`;

  return (
    <motion.div
      className="relative space-y-[2px] group p-4"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 150 }}
    >
      <Link href={`/account/produce/${crop._id}`}>
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none "
          style={{ background }}
        />

        <motion.div
          className="w-[130px] aspect-square rounded-[10px] overflow-hidden shadow-lg border border-gray-5 relative"
          whileHover={{
            rotateY: 5,
            rotateX: -2,
            transition: {
              type: "spring",
              bounce: 0.5,
              duration: 0.8,
            },
          }}
        >
          <Image
            src={crop.imgUrl[0]}
            fill
            alt={crop.name}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>

        <h3 className="text-[14px] font-medium tracking-wide mt-1">
          {crop.name}
        </h3>

        <h1 className="text-[15px] font-bold tracking-wide">
          {crop.price} USDC
        </h1>

        <p className="text-[12px] font-normal">{crop.weight} Kg</p>
      </Link>
    </motion.div>
  );
};

export default ProduceCard;
