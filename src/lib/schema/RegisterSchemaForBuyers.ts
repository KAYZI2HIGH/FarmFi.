import { z } from "zod";

export const formSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters." }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters." }),

    email: z.string().email({ message: "Enter a valid email address." }),

    phone: z.string().min(10, { message: "Enter a valid phone number." }),

    dateOfBirth: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, {
      message: "Date of Birth must be in dd/mm/yyyy format",
    }),

    address: z.string().min(10, { message: "Enter a valid address." }),

    nationalIdentityNumber: z.string().min(11, {
      message: "Enter a valid National Identity Number.",
    }),

    state: z.string().min(2, { message: "Enter your state of residence." }),

    createPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),

    reEnterPassword: z
      .string()
      .min(6, { message: "Please re-enter your password." }),
  })
  .refine((data) => data.createPassword === data.reEnterPassword, {
    message: "Passwords do not match.",
    path: ["reEnterPassword"],
  });
