import * as yup from "yup";

const profileSchema = yup.object({
  firstName: yup.string().required("Nama depan wajib diisi.").default(""),
  lastName: yup.string().required("Nama belakang wajib diisi.").default(""),
  username: yup.string().required("Nama belakang wajib diisi.").default(""),
  email: yup
    .string()
    .required("Email is required.")
    .test(
      "include-at",
      "Email must include the @ symbol.",
      (value) => !!value && value.includes("@"),
    )
    .email("Email is invalid.")
    .default(""),
  whatsappNumber: yup
    .string()
    .required("Nomor whatsapp wajib diisi.")
    .default(""),
  position: yup.string().required("Jabatan wajib diisi.").default(""),
  avatar: yup
    .mixed<Blob>()
    .test("fileSize", "Ukuran file maksimal 1 MB", (value) => {
      return value && value.size <= 1048576; // 1 MB
    })
    .test("fileFormat", "Format yang diperbolehkan PNG, JPG, JPEG", (value) => {
      return (
        value && ["image/png", "image/jpg", "image/jpeg"].includes(value.type)
      );
    }),
});

const passwordSchema = yup.object({
  password: yup.string().required("Password wajib diisi.").default(""),
  newPassword: yup.string().required("Password baru wajib diisi.").default(""),
  confirmPassword: yup
    .string()
    .required("Konfirmasi password wajib diisi.")
    .default(""),
});

export { profileSchema, passwordSchema };
