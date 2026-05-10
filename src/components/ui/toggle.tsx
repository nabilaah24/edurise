import { cn } from "@/lib/utils";
import React from "react";

type ToggleProps = React.ComponentProps<"input">;

function Toggle(props: ToggleProps) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        {...props}
        className={cn("sr-only peer", props.className)}
      />
      <div className="relative w-9 h-5 bg-disabled peer-focus:outline-none peer-focus:ring peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-0.5 after:inset-s-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
    </label>
  );
}

export { Toggle };
export type { ToggleProps };
