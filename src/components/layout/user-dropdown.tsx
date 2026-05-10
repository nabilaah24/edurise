"use client";

import { useEffect, useRef, useState } from "react";
import { Avatar } from "../ui/avatar";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function UserDropdown({ avatarImage }: { avatarImage: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        event.target instanceof Node &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleSignOut = async () => {
    const data = await signOut({
      redirect: false,
      callbackUrl: "/login",
    });

    if (!data.url) {
      toast.error("Error", { description: "Gagal logout" });
      return;
    }
    toast.success("Sukses", { description: "Berhasil logout" });
    router.replace("/login");
  };

  return (
    <div className="dropdown inline-block relative">
      <Avatar
        loading="eager"
        src={avatarImage ?? ""}
        onClick={() => setOpen((prev) => !prev)}
      />
      <ul
        className={cn(
          "dropdown-menu absolute mt-3 right-0 hidden p-1 rounded bg-white shadow-lg border border-disabled/20 min-w-35",
          open && "block",
        )}
        ref={menuRef}
      >
        <li>
          <Button
            variant="destructive"
            className="w-full justify-start"
            onClick={(event) => {
              event.preventDefault();
              handleSignOut();
            }}
          >
            <LogOut size={16} />
            Keluar
          </Button>
        </li>
      </ul>
    </div>
  );
}

export { UserDropdown };
