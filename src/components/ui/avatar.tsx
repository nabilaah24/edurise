"use client";

import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import Image from "next/image";
import React, { useMemo, useState } from "react";

interface AvatarProps extends Omit<React.ComponentProps<typeof Image>, "alt"> {
  alt?: React.ComponentProps<typeof Image>["alt"];
  wrapper?: React.ComponentProps<"div">;
}

const AVATAR_WIDTH = 48;
const AVATAR_HEIGHT = 48;

function Avatar({
  src,
  alt = "avatar image",
  width = AVATAR_WIDTH,
  height = AVATAR_HEIGHT,
  wrapper,
  ...props
}: AvatarProps) {
  const [isError, setIsError] = useState(false);
  const fallback = useMemo(() => !src || isError, [isError, src]);

  return (
    <div
      {...wrapper}
      className={cn(
        "rounded-full flex items-center justify-center overflow-hidden",
        fallback && "bg-disabled/50 p-2.5",
        wrapper?.className,
      )}
    >
      {fallback ? (
        <User
          style={{
            width: +width - 20,
            height: +height - 20,
          }}
          className={props.className}
        />
      ) : (
        <Image
          {...{ src, alt, width, height, ...props }}
          className={cn("size-auto", props.className)}
          onError={() => setIsError(true)}
        />
      )}
    </div>
  );
}

export { Avatar };
export type { AvatarProps };
