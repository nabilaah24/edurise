import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "default" | "primary" | "primary-light" | "outline" | "destructive";
}

const buttonVariants = (
  variant: ButtonProps["variant"],
): ButtonProps["className"] => {
  switch (variant) {
    case "primary": {
      return "text-white bg-primary hover:bg-blue-600 focus-visible:outline-primary/50 focus-visible:bg-blue-600";
    }

    case "primary-light": {
      return "text-primary bg-light-blue hover:bg-blue-200 focus-visible:outline-blue-200 focus-visible:bg-blue-200";
    }

    case "outline": {
      return "text-secondary border border-secondary hover:bg-secondary/10 focus-visible:outline-secondary/50 focus-visible:bg-secondary/10 disabled:border-disabled";
    }

    case "destructive": {
      return "hover:bg-red-200 hover:text-red-800 active:bg-red-200 active:text-red-800";
    }

    default: {
      return "text-secondary disabled:opacity-50 focus-visible:outline-neutral-400";
    }
  }
};

function Button({ variant = "default", ...props }: ButtonProps) {
  const defaultCustomStyle =
    "px-3 h-10 rounded-lg font-semibold disabled:bg-disabled disabled:text-white-subtle disabled:focus-visible:outline-disabled/50 shadow-[0_1px_2px_0_#1018280D]";

  return (
    <button
      {...props}
      className={cn(
        buttonVariants(variant),
        variant !== "default" && defaultCustomStyle,
        "cursor-pointer disabled:cursor-not-allowed has-[svg]:flex has-[svg]:items-center has-[svg]:gap-2.5 justify-center text-sm",
        props.className,
      )}
    />
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
