import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// This function is used to merge Tailwind CSS classes with clsx
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This function is used to parse and stringify a value
export const parseStringify = (value: unknown) => {
  return JSON.parse(JSON.stringify(value));
};
