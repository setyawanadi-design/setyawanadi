import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const TECH_DASH = {
    backgroundImage: 'linear-gradient(to right, var(--color-border) 60%, transparent 40%)',
    backgroundSize: '6px 1.5px',
    backgroundRepeat: 'repeat-x'
};
