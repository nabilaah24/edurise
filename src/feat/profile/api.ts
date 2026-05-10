"use server";

import { BaseURL } from "@/config";
import {
  PasswordForm,
  ProfileForm,
  UserNotificationSettings,
  UserResponse,
} from "./dto";
import axios from "axios";
import { createResponseError } from "@/lib/utils";
import { auth } from "@/lib/helper";

const getProfileMe = async (): Promise<{
  data: UserResponse | null;
  error?: string;
}> => {
  try {
    const session = await auth();
    const response = await axios.get<{ data: UserResponse }>(
      `${BaseURL}/api/profile/${session?.user.id}`,
    );
    return { data: response.data.data };
  } catch (error) {
    return createResponseError({ data: null, error });
  }
};

const getDefaultNotifSettings = async (): Promise<{
  data: UserNotificationSettings | null;
  error?: string;
}> => {
  try {
    const session = await auth();
    const response = await axios.get<UserNotificationSettings>(
      `${BaseURL}/api/profile/${session?.user.id}/notification-settings`,
    );
    return { data: response.data };
  } catch (error) {
    return createResponseError({ data: null, error });
  }
};

const updateNotificationSettings = async (
  id: number,
  payload: Partial<UserNotificationSettings>,
): Promise<{ error?: string; data: UserNotificationSettings | null }> => {
  try {
    const session = await auth();
    const response = await axios.patch(
      `${BaseURL}/api/profile/${session?.user.id}/notification-settings/${id}`,
      payload,
    );
    return { data: response.data };
  } catch (error) {
    return createResponseError({ data: null, error });
  }
};

const updateProfile = async (
  payload: ProfileForm,
): Promise<{ error?: string; data: ProfileForm | null }> => {
  try {
    // TODO: hit api
    // const session = await auth();
    return { data: payload };
  } catch (error) {
    return createResponseError({ data: null, error });
  }
};

const updatePassword = async (
  payload: PasswordForm,
): Promise<{ error?: string; data: PasswordForm | null }> => {
  try {
    // TODO: hit api
    // const session = await auth();
    return { data: payload };
  } catch (error) {
    return createResponseError({ data: null, error });
  }
};

export {
  getProfileMe,
  getDefaultNotifSettings,
  updateNotificationSettings,
  updateProfile,
  updatePassword,
};
