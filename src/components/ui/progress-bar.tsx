import { cn } from "@/lib/utils";

interface ProgressBarProps extends React.ComponentProps<"div"> {
  width: number;
  wrapper?: React.ComponentProps<"div">;
}

function ProgressBar({
  width = 0,
  wrapper,
  className,
  ...props
}: ProgressBarProps) {
  return (
    <div className="flex gap-6 items-center">
      <div
        className={cn("w-full bg-light-blue rounded h-2", wrapper?.className)}
      >
        <div
          {...props}
          className={cn(
            "bg-light-blue h-2 rounded-full",
            width > 0 && "bg-primary",
            width >= 100 && "bg-success",
            className,
          )}
          style={{ width: `${width}%` }}
        ></div>
      </div>
      <span
        className={cn(
          "text-sm",
          width > 0 && "text-primary",
          width >= 100 && "text-success",
        )}
      >
        {`${width}%`}
      </span>
    </div>
  );
}

export { ProgressBar };
export type { ProgressBarProps };
