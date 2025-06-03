import { z } from "zod";

export const formSchema = z.object({
  produceName: z.string().min(2, {
    message: "Produce name must be at least 2 characters.",
  }),
  type: z.string().min(2, {
    message: "Please enter either cash crop, staple crop or other.",
  }),
  description: z.string().min(200, {
    message: "Your description should exceed 200 characters.",
  }),
  quantity: z.string().min(2, {
    message: "quantity must be at least 2 characters.",
  }),
  price: z.number().positive({
    message: "Price must be positive",
  }),
  harvestDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: "Please use dd/mm/yyyy format",
  }),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: "Please use dd/mm/yyyy format",
  }),
  farmLocation: z.string().min(10, {
    message: "Please enter a valid location.",
  }),
  farmerContact: z.string().min(5, {
    message: "Please your contact details.",
  }),
  produceImages: z
    .any()
    .refine((files) => files?.length > 0, "At least one image is required")
    .refine(
      (files) => files?.every((file: File) => file.size <= 10 * 1024 * 1024),
      "Each file must be less than 10MB"
    ),
});
