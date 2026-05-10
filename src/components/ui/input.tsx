"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Button, ButtonProps } from "./button";
import { Eye, EyeClosed, LucideIcon, Mail, Search } from "lucide-react";

type InputProps = React.ComponentProps<"input">;

const INPUT_WITH_ICON = ["password", "email", "search"] as const;

type InputWithIconType = (typeof INPUT_WITH_ICON)[number];
type InputGroupAddonPosition = "prepend" | "append";
type InputGroupAddon = {
  [key in InputWithIconType]: {
    icon: LucideIcon;
    position: InputGroupAddonPosition;
    className?: ButtonProps["className"];
    type: InputProps["type"];
  };
};

const DefaultInput: React.FC<InputProps> = (props) => (
  <input
    {...props}
    className={cn(
      "h-10 border border-disabled focus-visible:border-primary focus-visible:outline-none py-2.5 px-3.5 rounded-lg aria-invalid:border-red-500!",
      props.className,
    )}
  />
);

function isInputWithIcon(type: InputProps["type"]): type is InputWithIconType {
  return INPUT_WITH_ICON.some((item) => item === type);
}

function Input({ type, className, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  if (type && isInputWithIcon(type) && INPUT_WITH_ICON.includes(type)) {
    if (!isInputWithIcon(type)) return;

    const inputGroupAddon: InputGroupAddon = {
      password: {
        icon: showPassword ? EyeClosed : Eye,
        position: "append",
        type: showPassword ? "text" : "password",
      },
      email: {
        icon: Mail,
        position: "prepend",
        type: "email",
        className: "pointer-event-none cursor-default",
      },
      search: {
        icon: Search,
        position: "prepend",
        type: "search",
        className: "pointer-event-none cursor-default",
      },
    };

    const inputAddon = inputGroupAddon[type];

    return (
      <div className="relative">
        <DefaultInput
          {...props}
          type={inputAddon.type}
          className={cn(
            "w-full",
            inputAddon.position === "append" && "pr-12",
            inputAddon.position === "prepend" && "pl-12",
            className,
          )}
        />
        <Button
          className={cn(
            "absolute top-1/2 -translate-y-1/2",
            inputAddon.position === "prepend" &&
              "left-3.5 focus-visible:outline-none",
            inputAddon.position === "append" && "right-3.5",
            inputAddon.className,
          )}
          type="button"
          onClick={() => {
            if (type !== "password") return;
            setShowPassword((prev) => !prev);
          }}
        >
          <inputAddon.icon className="size-5" />
        </Button>
      </div>
    );
  }

  return <DefaultInput {...props} />;
}

export { Input };
export type { InputProps };
