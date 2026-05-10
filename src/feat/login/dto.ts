import * as yup from "yup";
import { loginSchema } from "./schema";

type LoginForm = yup.InferType<typeof loginSchema>;

export type { LoginForm };
