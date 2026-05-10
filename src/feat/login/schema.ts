import * as yup from "yup";

const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email wajib diisi.")
    .test(
      "include-at",
      "Email harus mengandung simbol @.",
      (value) => !!value && value.includes("@"),
    )
    .email("Email tidak valid.")
    .default(""),
  password: yup.string().required("Password wajib diisi.").default(""),
  rememberMe: yup.boolean().default(false),
});

export { loginSchema };
