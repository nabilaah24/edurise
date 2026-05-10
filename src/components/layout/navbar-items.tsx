"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarItemProps {
  menus: { [key in "label" | "href"]: string }[];
}

function NavbarItem({ menus }: NavbarItemProps) {
  const pathname = usePathname();

  return (
    <ul
      className={cn(
        "flex items-center mb-9.5 gap-6 [&>li]:w-42 [&>li]:h-full [&>li]:flex [&>li]:items-center [&>li]:text-disabled [&>li]:data-[active=true]:text-secondary [&>li]:data-[active=true]:font-semibold [&>li]:hover:font-semibold [&>li]:hover:text-secondary [&>li]:cursor-pointer [&>li]:justify-center h-16 [&>li]:data-[active=true]:shadow-[inset_0_-3px_0_0_var(--color-primary)]",
      )}
    >
      {menus.map((item, index) => {
        const isActive = pathname === item.href;

        return (
          <li key={`navItem-${index}`} data-active={isActive}>
            <Link
              href={item.href}
              className="h-full w-full items-center justify-center flex"
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export { NavbarItem };
export type { NavbarItemProps };
