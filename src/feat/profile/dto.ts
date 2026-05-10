import * as yup from "yup";
import { passwordSchema, profileSchema } from "./schema";
import { fetchFileAsFileObject } from "./helper";

interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  whatsappNumber: string;
  position: string;
  avatar?: string;
}

type ProfileForm = yup.InferType<typeof profileSchema>;
type PasswordForm = yup.InferType<typeof passwordSchema>;

const handleGetDefaultValue = async (
  data: UserResponse,
): Promise<ProfileForm> => {
  const avatarFile = data.avatar
    ? await fetchFileAsFileObject(data.avatar, "avatar")
    : null;

  return {
    ...data,
    avatar: avatarFile ?? undefined,
  };
};

interface EmailSettings {
  weeklyReport: boolean;
  certificateAchievement: boolean;
  latestCourseRecommendations: boolean;
}

interface WhatsappSettings {
  motivationalMessage: boolean;
}

interface UserNotificationSettings {
  id: number;
  userId: number;
  email: EmailSettings;
  whatsapp: WhatsappSettings;
}

export type {
  UserResponse,
  ProfileForm,
  PasswordForm,
  UserNotificationSettings,
};
export { handleGetDefaultValue };
