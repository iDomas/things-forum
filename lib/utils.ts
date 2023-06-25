import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const createIdFromTitle = (title: string): string => {
    return title.toLowerCase().replace(/\s/g, "-")
}

export { createIdFromTitle }