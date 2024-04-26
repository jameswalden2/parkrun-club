import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function secondsToHMS(seconds: string | number | number[]): string {
    if (typeof seconds != "number") {
        return String(seconds);
    }
    if (isNaN(seconds)) {
        throw new Error("Input must be a valid number of seconds");
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const hh = hours > 0 ? String(hours) : "";
    const mm = minutes > 0 ? String(minutes) : "";
    const ss = Math.round(remainingSeconds * 100) / 100;

    const timeParts = [hh, mm, ss].filter((part) => part !== ""); // Remove empty parts
    return timeParts.join(":");
}

export async function copyTextToClipboard(text: string): Promise<boolean> {
    if (!text) {
        return false;
    }

    try {
        // Try to copy text to the clipboard
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        // Handle potential errors (e.g., user denied clipboard access)
        return false;
    }
}
