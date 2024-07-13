import { z } from "zod";

export const Registerschema = z.object({
  name: z.string().min(2, "Votre nom doit contenir a").max(50),
  email: z.string().email("Email invalid"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});
export const Loginschema = z.object({
  email: z.string().email("Email invalid"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export const Forgotschema = z.object({
  email: z.string().email("Email invalid"),
});
