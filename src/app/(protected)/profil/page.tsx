import { PageContainer } from "@/components/layout/page-container";
import { getDefaultNotifSettings, getProfileMe } from "@/feat/profile/api";
import { notFound } from "next/navigation";
import ProfileClient from "./client";

async function ProfilePage() {
  const { data: profile, error } = await getProfileMe();
  const { data: defaultNotifSettings } = await getDefaultNotifSettings();

  if (error || !profile || !defaultNotifSettings) return notFound();

  return (
    <PageContainer title="Akun">
      <ProfileClient {...{ profile, defaultNotifSettings }} />
    </PageContainer>
  );
}

export default ProfilePage;
