import { cn } from "@/lib/utils";

const ICON_NAMES = [
  "youtube",
  "facebook",
  "instagram",
  "linkedin",
  "twitter",
  "apple",
  "play-circle",
  "check-square",
  "trophy",
] as const;

interface IconProps extends React.ComponentProps<"svg"> {
  type: (typeof ICON_NAMES)[number];
  size?: number;
}

function Icon({ type, className, size = 16, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      {...props}
      className={cn("text-secondary", className)}
    >
      <use xlinkHref={`/sprite.svg#${type}`}></use>
    </svg>
  );
}

export { Icon, ICON_NAMES };
export type { IconProps };
