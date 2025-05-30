"use client";
import { useState, useEffect } from "react";
import { buyerSidebarLinks, farmerSidebarLinks, links } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  linkVariants,
  mobileMenuVariants,
} from "@/lib/animation-variants/NavbarVariants";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import ProfileAvatar from "./custom-ui/ProfileAvater";
import LogoutBtn from "./custom-ui/LogoutBtn";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = user?.role === "buyer" ? buyerSidebarLinks : farmerSidebarLinks;

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 bg-[#E1C699] z-50 px-5 md:px-[50px] py-[20px] transition-all duration-300 ${
        scrolled ? "bg-[#E1C699]/90 backdrop-blur-md shadow-sm" : "bg-[#E1C699]"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex justify-between items-center max-w-[1068px] w-full mx-auto">
        <Link
          href="/"
          className="flex gap-3 items-center justify-center"
        >
          <Image
            src="/logo/main-logo.svg"
            alt="Logo"
            width={32}
            height={35.875}
            className="hover:rotate-[-10deg] transition-transform duration-300"
          />
          <motion.p
            className="text-[18px] font-bold"
            whileHover={{ scale: 1.05 }}
          >
            FarmFI
          </motion.p>
        </Link>

        <nav className="hidden md:block">
          <ul className="gap-[50px] flex">
            {links.map((link, idx) => (
              <motion.li
                key={idx}
                whileHover="hover"
                whileTap="tap"
                variants={linkVariants}
                className="body_text font-semibold tracking-wide"
              >
                <Link
                  href={link.url}
                  className="relative group"
                >
                  {link.title}
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--chestnut-brown)]"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        {!isAuthenticated && (
          <button
            className="md:hidden focus:outline-none z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={isOpen ? "open" : "closed"}
              className="flex flex-col gap-[6px]"
            >
              <motion.span
                className="w-6 h-[2px] bg-[var(--chestnut-brown)] block"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 8 },
                }}
              />
              <motion.span
                className="w-6 h-[2px] bg-[var(--chestnut-brown)] block"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
              />
              <motion.span
                className="w-6 h-[2px] bg-[var(--chestnut-brown)] block"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -8 },
                }}
              />
            </motion.div>
          </button>
        )}

        {isAuthenticated && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <ProfileAvatar
                image={user.imgUrl}
                name={user.name}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-[#E1C699] mt-8 BORDER-"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="mb-0 pb-0 font-bold tracking-wide">
                {user?.name?.split(" ")[0]}
              </DropdownMenuLabel>
              <DropdownMenuLabel className="text-[12px] opacity-60">
                {user?.email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-black/10" />
              {items.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  asChild
                >
                  <Link
                    href={item.url}
                    className="flex gap-3 items-center"
                  >
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild>
                <LogoutBtn className="w-full h-ful items-center justify-start text-red-500 hover:bg-red-100 hover:text-red-500" />
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-black/10" />
              <div className="w-full flex items-center justify-center  text-sm opacity-60">
                FarmFi &copy; 2025
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block"
          >
            <Button
              className="call_to_action_btn_text bg-[var(--chestnut-brown)] hover:bg-[var(--chestnut-brown)]/90 px-5 rounded-full transition-all duration-300 hover:shadow-lg"
              asChild
            >
              <Link href={"/auth/login"}>Log in</Link>
            </Button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: {
                height: "auto",
                opacity: 1,
                transition: {
                  when: "beforeChildren",
                  staggerChildren: 0.1,
                },
              },
              closed: {
                height: 0,
                opacity: 0,
                transition: {
                  when: "afterChildren",
                  staggerChildren: 0.05,
                  staggerDirection: -1,
                },
              },
            }}
            className="md:hidden overflow-hidden bg-[#E1C699]/95 backdrop-blur-lg mt-4 rounded-lg shadow-xl"
          >
            <motion.ul className="flex flex-col gap-4 p-6">
              {links.map((link, idx) => (
                <motion.li
                  key={idx}
                  variants={mobileMenuVariants}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-b border-[var(--chestnut-brown)/20] pb-2 last:border-0"
                >
                  <Link
                    href={link.url}
                    className="text-lg font-semibold text-gray-800 hover:text-[var(--chestnut-brown)] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.title}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={mobileMenuVariants}
                className="pt-2"
              >
                <Button
                  className="w-full bg-[var(--chestnut-brown)] hover:bg-[var(--chestnut-brown)]/90 text-white"
                  onClick={() => setIsOpen(false)}
                  asChild
                >
                  <Link href={"/auth/login"}>Log in</Link>
                </Button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;
