import { Loader2 } from "lucide-react";

function Loading() {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center h-screen gap-4"
    >
      <Loader2 size={36} className="animate-spin" />
      <span className="font-poppins text-2xl">Loading...</span>
    </div>
  );
}

export { Loading };
