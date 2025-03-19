import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date?: string | number | Date) => {
    if (!date) return ''
    const dateObject = typeof date === 'string' || typeof date === 'number' 
        ? new Date(date) 
        : date
    return dateObject.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}
