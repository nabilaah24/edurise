import { Check } from "lucide-react";

type CheckboxProps = React.ComponentProps<"input">;

function Checkbox({ id = "checkbox", ...props }: CheckboxProps) {
  return (
    <label
      className="relative flex cursor-pointer items-center rounded-full"
      htmlFor={id}
      data-ripple-dark="true"
    >
      <input
        {...props}
        id={id}
        type="checkbox"
        className="peer disabled:bg-disabled disabled:border-disabled disabled:cursor-not-allowed relative size-4 cursor-pointer appearance-none rounded border border-primary transition-all before:absolute before:top-1/2 before:left-1/2 before:block before:size-8 before:-translate-1/2 before:rounded-full before:bg-primary/50 before:opacity-0 before:transition-opacity checked:before:bg-primary/70 hover:before:opacity-10 focus-visible:outline-none focus-visible:before:bg-primary/70 focus-visible:before:opacity-10"
      />
      <span className="pointer-events-none absolute top-1/2 left-1/2 -translate-1/2 text-primary opacity-0 transition-opacity peer-checked:opacity-100">
        <Check className="size-3 stroke-3" />
      </span>
    </label>
  );
}

export { Checkbox };
export type { CheckboxProps };
