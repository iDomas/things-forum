import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const createIdFromTitle = (title: string): string => {
  const strs = title.split(/\s+/);
  const re = /[^A-Za-z0-9]/g;
  const santiziedStrs = strs.map((str) => str.replace(re, '')).filter((str) => str.length > 0);
  console.log(santiziedStrs);
  return santiziedStrs.join('-').toLowerCase();
}

export { createIdFromTitle }