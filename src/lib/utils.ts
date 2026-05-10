import { defaultErrorMessage } from "@/config";
import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function createResponseError<T>({ data, error }: { data: T; error: unknown }) {
  let errorMessage = defaultErrorMessage;
  if (error instanceof AxiosError) errorMessage = error.response?.data.message;
  return { data, error: errorMessage };
}

export { cn, createResponseError };
