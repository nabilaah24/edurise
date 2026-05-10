"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import {
  updateNotificationSettings,
  updatePassword,
  updateProfile,
} from "@/feat/profile/api";
import {
  handleGetDefaultValue,
  PasswordForm,
  ProfileForm,
  UserNotificationSettings,
  UserResponse,
} from "@/feat/profile/dto";
import { profileSchema, passwordSchema } from "@/feat/profile/schema";
import { useForm } from "@tanstack/react-form";
import { Loader, Upload } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

interface ProfileProps {
  profile: UserResponse;
  defaultNotifSettings: UserNotificationSettings;
}

function ProfileClient({ profile, defaultNotifSettings }: ProfileProps) {
  const [formValue, setFormValue] = useState<ProfileForm>();
  const passwordForm: PasswordForm = passwordSchema.getDefault();
  const [notificationSettings, setNotificationSettings] =
    useState(defaultNotifSettings);

  useEffect(() => {
    const fetchDefault = async () => {
      const response = await handleGetDefaultValue(profile);
      setFormValue(response);
    };

    fetchDefault();
  }, [profile]);

  const formProfile = useForm({
    defaultValues: formValue,
    validators: {
      onChangeAsync: profileSchema,
    },
    onSubmit: async ({ value }) => {
      const { error } = await updateProfile(value);

      if (!error) {
        toast.success("Sukses", { description: "Update profile berhasil" });
        return;
      }

      toast.error("Error", { description: "Update profile gagal" });
    },
  });

  const formPassword = useForm({
    defaultValues: passwordForm,
    validators: {
      onChangeAsync: passwordSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      const { error } = await updatePassword(value);

      if (!error) {
        formApi.reset();
        toast.success("Sukses", { description: "Update password berhasil" });
        return;
      }

      toast.error("Error", { description: "Update password gagal" });
    },
  });

  const handleChangeNotifSettings = async (
    payload: Partial<UserNotificationSettings>,
  ) => {
    const beforeUpdated = { ...notificationSettings };
    const updated = { ...notificationSettings, ...payload };
    setNotificationSettings(updated);
    const { error } = await updateNotificationSettings(updated.id, updated);

    if (error) {
      setNotificationSettings(beforeUpdated);
      return toast.error("Error", { description: error });
    }
    toast.success("Sukses", {
      description: "Berhasil update pengaturan pemberitahuan",
    });
  };

  const isEmailNotifOn = useMemo(
    () =>
      notificationSettings.email.weeklyReport ||
      notificationSettings.email.certificateAchievement ||
      notificationSettings.email.latestCourseRecommendations,
    [notificationSettings],
  );

  return (
    <div className="space-y-10">
      <div className="flex max-md:flex-col gap-10 lg:gap-20">
        <div className="lg:px-11 py-18.5 flex-col flex gap-5.5 items-center md:w-92">
          <formProfile.Field name="avatar">
            {(field) => {
              const { name, state, handleChange } = field;
              const { value, meta } = state;
              const { isTouched, errors } = meta;
              const isError = isTouched && errors.length > 0;

              return (
                <div className="space-y-2 text-center">
                  <label
                    className="relative cursor-pointer flex"
                    htmlFor={name}
                  >
                    <Avatar
                      src={value ? URL.createObjectURL(value) : ""}
                      alt="avatar"
                      width={280}
                      height={280}
                      wrapper={{ className: "rounded-lg size-70" }}
                      className="w-full h-full object-cover"
                    />
                    <input
                      type="file"
                      hidden
                      id={name}
                      onChange={(event) =>
                        handleChange(event.target.files?.[0])
                      }
                    />
                    <div className="absolute flex gap-2 justify-center bottom-0 w-full bg-black/50 rounded-b-lg py-3 font-medium text-white-subtle">
                      <Upload />
                      Unggah foto diri
                    </div>
                  </label>
                  {isError && (
                    <span className="text-error text-sm">
                      {errors[0]?.message}
                    </span>
                  )}
                </div>
              );
            }}
          </formProfile.Field>

          <div className="text-sm text-center font-medium">
            Ukuran gambar harus di bawah 1MB dan rasio gambar harus 1:1
          </div>
        </div>
        <div className="flex-1">
          <form
            className="flex flex-col gap-5.5"
            onSubmit={(event) => {
              event.preventDefault();
              formProfile.handleSubmit();
            }}
          >
            <div className="grid md:grid-cols-2 gap-5">
              <formProfile.Field name="firstName">
                {(field) => {
                  const { name, state, handleChange } = field;
                  const { value = "", meta } = state;
                  const { isTouched, errors } = meta;
                  const isError = isTouched && errors.length > 0;
                  return (
                    <div className="space-y-2">
                      <label htmlFor={name} className="flex flex-col gap-2">
                        Nama depan
                        <Input
                          id={name}
                          name={name}
                          type="text"
                          value={value}
                          onChange={(event) => handleChange(event.target.value)}
                          aria-invalid={isError}
                        />
                      </label>
                      {isError && (
                        <span className="text-error text-sm">
                          {errors[0]?.message}
                        </span>
                      )}
                    </div>
                  );
                }}
              </formProfile.Field>
              <formProfile.Field name="lastName">
                {(field) => {
                  const { name, state, handleChange } = field;
                  const { value = "", meta } = state;
                  const { isTouched, errors } = meta;
                  const isError = isTouched && errors.length > 0;
                  return (
                    <div className="space-y-2">
                      <label htmlFor={name} className="flex flex-col gap-2">
                        Nama belakang
                        <Input
                          id={name}
                          name={name}
                          type="text"
                          value={value}
                          onChange={(event) => handleChange(event.target.value)}
                          aria-invalid={isError}
                        />
                      </label>
                      {isError && (
                        <span className="text-error text-sm">
                          {errors[0]?.message}
                        </span>
                      )}
                    </div>
                  );
                }}
              </formProfile.Field>
            </div>
            <formProfile.Field name="username">
              {(field) => {
                const { name, state, handleChange } = field;
                const { value = "", meta } = state;
                const { isTouched, errors } = meta;
                const isError = isTouched && errors.length > 0;
                return (
                  <div className="space-y-2">
                    <label htmlFor={name} className="flex flex-col gap-2">
                      Username
                      <Input
                        id={name}
                        name={name}
                        type="text"
                        value={value}
                        onChange={(event) => handleChange(event.target.value)}
                        aria-invalid={isError}
                      />
                    </label>
                    {isError && (
                      <span className="text-error text-sm">
                        {errors[0]?.message}
                      </span>
                    )}
                  </div>
                );
              }}
            </formProfile.Field>
            <formProfile.Field name="email">
              {(field) => {
                const { name, state, handleChange } = field;
                const { value = "", meta } = state;
                const { isTouched, errors } = meta;
                const isError = isTouched && errors.length > 0;
                return (
                  <div className="space-y-2">
                    <label htmlFor={name} className="flex flex-col gap-2">
                      Email
                      <Input
                        id={name}
                        name={name}
                        type="text"
                        value={value}
                        onChange={(event) => handleChange(event.target.value)}
                        aria-invalid={isError}
                      />
                    </label>
                    {isError && (
                      <span className="text-error text-sm">
                        {errors[0]?.message}
                      </span>
                    )}
                  </div>
                );
              }}
            </formProfile.Field>
            <formProfile.Field name="whatsappNumber">
              {(field) => {
                const { name, state, handleChange } = field;
                const { value = "", meta } = state;
                const { isTouched, errors } = meta;
                const isError = isTouched && errors.length > 0;
                return (
                  <div className="space-y-2">
                    <label htmlFor={name} className="flex flex-col gap-2">
                      Nomor whatsapp
                      <Input
                        id={name}
                        name={name}
                        type="text"
                        value={value}
                        onChange={(event) => handleChange(event.target.value)}
                        aria-invalid={isError}
                      />
                    </label>
                    {isError && (
                      <span className="text-error text-sm">
                        {errors[0]?.message}
                      </span>
                    )}
                  </div>
                );
              }}
            </formProfile.Field>
            <formProfile.Field name="position">
              {(field) => {
                const { name, state, handleChange } = field;
                const { value = "", meta } = state;
                const { isTouched, errors } = meta;
                const isError = isTouched && errors.length > 0;
                return (
                  <div className="space-y-2">
                    <label htmlFor={name} className="flex flex-col gap-2">
                      Jabatan
                      <Input
                        id={name}
                        name={name}
                        type="text"
                        value={value}
                        onChange={(event) => handleChange(event.target.value)}
                        aria-invalid={isError}
                      />
                    </label>
                    {isError && (
                      <span className="text-error text-sm">
                        {errors[0]?.message}
                      </span>
                    )}
                  </div>
                );
              }}
            </formProfile.Field>
            <formProfile.Subscribe selector={(state) => [state.isSubmitting]}>
              {([isSubmitting]) => (
                <Button
                  variant="primary"
                  type="submit"
                  className="w-37.5"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <Loader className="animate-spin stroke-3 size-4" />
                  )}
                  Simpan
                </Button>
              )}
            </formProfile.Subscribe>
          </form>
        </div>
      </div>

      <div className="grid md:grid-cols-2">
        <form
          className="flex flex-col gap-5.5"
          onSubmit={(event) => {
            event.preventDefault();
            formPassword.handleSubmit();
          }}
        >
          <formPassword.Field name="password">
            {(field) => {
              const { name, state, handleChange } = field;
              const { value = "", meta } = state;
              const { isTouched, errors } = meta;
              const isError = isTouched && errors.length > 0;
              return (
                <div className="space-y-2">
                  <label htmlFor={name} className="flex flex-col gap-2">
                    Password
                    <Input
                      id={name}
                      name={name}
                      type="password"
                      placeholder="Password"
                      value={value}
                      onChange={(event) => handleChange(event.target.value)}
                      aria-invalid={isError}
                    />
                  </label>
                  {isError && (
                    <span className="text-error text-sm">
                      {errors[0]?.message}
                    </span>
                  )}
                </div>
              );
            }}
          </formPassword.Field>
          <formPassword.Field name="newPassword">
            {(field) => {
              const { name, state, handleChange } = field;
              const { value = "", meta } = state;
              const { isTouched, errors } = meta;
              const isError = isTouched && errors.length > 0;
              return (
                <div className="space-y-2">
                  <label htmlFor={name} className="flex flex-col gap-2">
                    Password Baru
                    <Input
                      id={name}
                      name={name}
                      type="password"
                      placeholder="Password Baru"
                      value={value}
                      onChange={(event) => handleChange(event.target.value)}
                      aria-invalid={isError}
                    />
                  </label>
                  {isError && (
                    <span className="text-error text-sm">
                      {errors[0]?.message}
                    </span>
                  )}
                </div>
              );
            }}
          </formPassword.Field>
          <formPassword.Field name="confirmPassword">
            {(field) => {
              const { name, state, handleChange } = field;
              const { value = "", meta } = state;
              const { isTouched, errors } = meta;
              const isError = isTouched && errors.length > 0;
              return (
                <div className="space-y-2">
                  <label htmlFor={name} className="flex flex-col gap-2">
                    Konfirmasi password
                    <Input
                      id={name}
                      name={name}
                      type="password"
                      placeholder="Konfirmasi password"
                      value={value}
                      onChange={(event) => handleChange(event.target.value)}
                      aria-invalid={isError}
                    />
                  </label>
                  {isError && (
                    <span className="text-error text-sm">
                      {errors[0]?.message}
                    </span>
                  )}
                </div>
              );
            }}
          </formPassword.Field>
          <formPassword.Subscribe selector={(state) => [state.isSubmitting]}>
            {([isSubmitting]) => (
              <Button
                variant="primary"
                type="submit"
                className="w-37.5"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <Loader className="animate-spin stroke-3 size-4" />
                )}
                Ubah Password
              </Button>
            )}
          </formPassword.Subscribe>
        </form>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h1 className="font-poppins font-medium text-2xl">
            Pengaturan pemberitahuan email
          </h1>
          <div className="space-y-6">
            <label className="flex gap-2" htmlFor="email-notif">
              <Toggle
                id="email-notif"
                checked={isEmailNotifOn}
                onChange={(event) => {
                  const payload: Partial<UserNotificationSettings> = {
                    email: {
                      weeklyReport: event.target.checked,
                      certificateAchievement: event.target.checked,
                      latestCourseRecommendations: event.target.checked,
                    },
                  };
                  handleChangeNotifSettings(payload);
                }}
              />
              Pemberitahuan email {isEmailNotifOn ? "aktif" : "tidak aktif"}
            </label>
            <label className="flex gap-2" htmlFor="weeklyReport">
              <Checkbox
                id="weeklyReport"
                checked={notificationSettings.email.weeklyReport}
                onChange={(event) =>
                  handleChangeNotifSettings({
                    email: {
                      ...notificationSettings.email,
                      weeklyReport: event.target.checked,
                    },
                  })
                }
                disabled={!isEmailNotifOn}
              />
              Laporan belajar kursus per minggu
            </label>
            <label className="flex gap-2" htmlFor="certificateAchievement">
              <Checkbox
                id="certificateAchievement"
                checked={notificationSettings.email.certificateAchievement}
                onChange={(event) =>
                  handleChangeNotifSettings({
                    email: {
                      ...notificationSettings.email,
                      certificateAchievement: event.target.checked,
                    },
                  })
                }
                disabled={!isEmailNotifOn}
              />
              Pencapaian sertifikat
            </label>
            <label className="flex gap-2" htmlFor="latestCourseRecommendations">
              <Checkbox
                id="latestCourseRecommendations"
                checked={notificationSettings.email.latestCourseRecommendations}
                onChange={(event) =>
                  handleChangeNotifSettings({
                    email: {
                      ...notificationSettings.email,
                      latestCourseRecommendations: event.target.checked,
                    },
                  })
                }
                disabled={!isEmailNotifOn}
              />
              Rekomendasi kursus terbaru
            </label>
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="font-poppins font-medium text-2xl">
            Pengaturan pemberitahuan whatsapp
          </h1>
          <div className="space-y-6">
            <label className="flex gap-2" htmlFor="toggle-whatsapp">
              <Toggle
                id="toggle-whatsapp"
                checked={notificationSettings.whatsapp.motivationalMessage}
                onChange={(event) => {
                  const payload: Partial<UserNotificationSettings> = {
                    whatsapp: {
                      motivationalMessage: event.target.checked,
                    },
                  };
                  handleChangeNotifSettings(payload);
                }}
              />
              Pemberitahuan whatsapp tidak aktif
            </label>
            <label className="flex gap-2" htmlFor="motivationalMessage">
              <Checkbox
                id="motivationalMessage"
                checked={notificationSettings.whatsapp.motivationalMessage}
                onChange={(event) =>
                  handleChangeNotifSettings({
                    whatsapp: {
                      ...notificationSettings.whatsapp,
                      motivationalMessage: event.target.checked,
                    },
                  })
                }
                disabled={!notificationSettings.whatsapp.motivationalMessage}
              />
              Kirim pesan motivasi lewat whatsapp
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileClient;
