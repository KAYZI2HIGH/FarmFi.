import { formSchema } from "@/lib/schema/NewListingSchema";
import { z } from "zod";

const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};


export const saveListing = async (values: z.infer<typeof formSchema>) => {
  try {

    const images = await Promise.all(
      values.produceImages.map(async (file) => ({
        name: file.name,
        type: file.type,
        base64: await convertFileToBase64(file),
        size: file.size,
        lastModified: file.lastModified,
      }))
    );


    const listing = {
      ...values,
      produceImages: images,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };


    const listings = getListings();
    localStorage.setItem("listings", JSON.stringify([...listings, listing]));

    return listing;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const getListings = (): StoredListing[] => {
  try {
    return JSON.parse(localStorage.getItem("listings") || "[]");
  } catch {
    return [];
  }
};
