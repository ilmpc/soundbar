import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export * from "./api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
