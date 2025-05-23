"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { Button } from "../../ui/button";
import { MoveUpRight } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import {
  backgroundVariants,
  buttonVariants,
  containerVariants,
  itemVariants,
} from "@/lib/animation-variants/Hero";

const Hero = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <section className="px-5 md:px-[50px] pt-[100px] h-dvh relative flex justify-center overflow-hidden">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={backgroundVariants}
        className="w-full h-full absolute top-0"
      >
        <Image
          src={"/assets/home-bg.png"}
          alt="background image"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/20" />
      </motion.div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-[1068px] w-full mx-auto my-auto h-fit relative text-[#F4F4F4]"
      >
        <div className="max-w-[570px] space-y-[30px]">
          <motion.h1
            className="section_title  text-[28px] md:text-[38px] leading-normal"
            variants={itemVariants}
          >
            Trading Agricultural Produce Made Seamless with Crypto
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="body_text opacity-80"
          >
            FarmFi utilizes smart contracts and $SUI-based escrows to ensure
            secure, instant payments, eliminate intermediaries, and create a
            trustless, transparent marketplace for farm produce.
          </motion.p>

          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-fit"
          >
            <Button
              className="group bg-[var(--forest-green)] hover:bg-[var(--forest-green)]/90 rounded-full px-6 py-4 call_to_action_btn_text"
              asChild
            >
              <Link href={"/auth"}>
                Get started
                <MoveUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
