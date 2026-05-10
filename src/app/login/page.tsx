import { auth } from "@/lib/helper";
import LoginClient from "./client";
import { redirect, RedirectType } from "next/navigation";

async function LoginPage() {
  const session = await auth();
  if (!!session) return redirect("/dashboard", RedirectType.replace);

  return <LoginClient />;
}

export default LoginPage;
