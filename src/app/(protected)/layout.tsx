import { Footer, FooterProps } from "@/components/layout/footer";
import { NavbarItem } from "@/components/layout/navbar-items";
import { Avatar } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
import React from "react";
import { AppConfig } from "@/config";
import { auth } from "@/lib/helper";
import { UserDropdown } from "@/components/layout/user-dropdown";

const MENUS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Daftar Kursus", href: "/kursus" },
  { label: "Profil Saya", href: "/profil" },
];

const SOCIAL_MEDIA: FooterProps["socialMedia"] = [
  { icon: "linkedin", href: "#" },
  { icon: "instagram", href: "#" },
  { icon: "facebook", href: "#" },
  { icon: "youtube", href: "#" },
  { icon: "twitter", href: "#" },
];

const FOOTER_LINK_GROUP = [
  {
    title: "4 Kategori Teratas",
    children: [
      { label: "Pemrograman", href: "#" },
      { label: "Keuangan", href: "#" },
      { label: "Desain", href: "#" },
      { label: "Bisnis", href: "#" },
    ],
  },
  {
    title: "Tautan",
    children: [
      { label: "Tentang kami", href: "#" },
      { label: "Kontak kami", href: "#" },
      { label: "Bergabung dengan kami", href: "#" },
    ],
  },
  {
    title: "Bantuan",
    children: [
      { label: "Pusat bantuan", href: "#" },
      { label: "FAQs", href: "#" },
      { label: "Syarat & ketentuan", href: "#" },
      { label: "Kebijakan privasi", href: "#" },
    ],
  },
];

async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const profile = session?.user;

  return (
    <div className="space-y-8 flex flex-col min-h-screen">
      {/* navbar */}
      <div className="h-24 shadow-[0_1px_0_0_#E9EAF0] flex items-center justify-between px-10 md:px-25 sticky top-0 z-50 bg-white-subtle">
        <h1 className="font-poppins text-primary text-4xl font-semibold">
          {AppConfig.Title}
        </h1>
        <div className="flex justify-between items-center gap-6">
          {/* notification bell */}
          <div className="relative">
            <Bell />
            <div className="min-w-2 min-h-2 bg-error rounded-full absolute right-0 top-0"></div>
          </div>

          {/* avatar */}
          <UserDropdown avatarImage={profile?.avatar ?? ""} />
        </div>
      </div>

      {/* banner */}
      <div className="bg-light-green flex justify-center text-center px-10 md:px-25 py-2.5 font-poppins font-medium">
        Selamat datang kembali, {profile?.firstName} 🌱 Minggu baru, semangat
        baru! Yuk lanjutkan perjalanan belajarmu 🚀
      </div>

      <div className="px-10 md:px-25">
        {/* profile detail */}
        <div className="p-4 md:p-10 flex max-md:flex-col items-center gap-6">
          {/* avatar */}
          <Avatar
            loading="eager"
            width={110}
            height={110}
            src={profile?.avatar ?? ""}
            wrapper={{
              className: "shrink-0",
            }}
          />

          {/* name and desc profile */}
          <div className="space-y-2 max-md:text-center">
            <div className="font-poppins font-medium text-2xl">
              {`${profile?.firstName} ${profile?.lastName}`}
            </div>
            <div className="text-lg">{profile?.position}</div>
          </div>
        </div>

        {/* navbar item */}
        <NavbarItem menus={MENUS} />

        {/* content */}
        <main className="space-y-8 flex-1">{children}</main>
      </div>

      {/* footer */}
      <Footer socialMedia={SOCIAL_MEDIA} footerLinkGroup={FOOTER_LINK_GROUP} />
    </div>
  );
}

export default ProtectedLayout;
