'use server'

import { User } from "@/context/AuthContext";
import { cookies } from "next/headers";

export async function getCart(): Promise<Crop[]> {
  const cart = (await cookies()).get("cart")?.value;
  return cart ? JSON.parse(cart) : [];
}

export async function saveCart(cart: Crop[]): Promise<void> {
  (await cookies()).set("cart", JSON.stringify(cart), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

export async function addToCart(
  item: Omit<Crop, "weight">,
  weight: number = 1
): Promise<Crop[]> {
  const cart = await getCart();
  const existingItem = cart.find((cartItem) => cartItem._id === item._id);

  if (existingItem) {
    existingItem.weight += weight;
  } else {
    cart.push({ ...item, weight });
  }

  await saveCart(cart);
  return cart;
}

export async function removeFromCart(id: string) {
  const cart = (await getCart()).filter((item) => item._id !== id);
  await saveCart(cart);
  return;
}

export async function clearCart(): Promise<void> {
  (await cookies()).delete("cart");
}

export async function setRoleCookie(role: string) {
  (await cookies()).set("user_role", role, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
}

export async function getRoleCookie(): Promise<string | undefined> {
  return (await cookies()).get("user_role")?.value;
}


export async function removeRoleCookie() {
  (await cookies()).delete("user_role");
}

export async function getAllProduce(): Promise<Crop[]> {
  const response = await fetch("https://farmfi-node.onrender.com/product/all",
    // {
    // next: {
    //   revalidate
    // }
    // }
  );
  return response.json();
}

export const updateUserProfile = async (
  userId: string,
  updates: Partial<User>
) => {
  const response = await fetch(
    `https://farmfi-node.onrender.com/auth/update/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${Cookies.get("authToken")}`,
      },
      body: JSON.stringify(updates),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  return response.json();
};