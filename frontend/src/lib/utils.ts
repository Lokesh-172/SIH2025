import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: (string | undefined | null | false | 0)[]) {
  return twMerge(clsx(inputs));
}
