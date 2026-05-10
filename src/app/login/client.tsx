"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AppConfig } from "@/config";
import { signIn } from "next-auth/react";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/feat/login/schema";
import { LoginForm } from "@/feat/login/dto";
import { toast } from "sonner";

function LoginClient() {
  const router = useRouter();
  const defaultValues: LoginForm = loginSchema.getDefault();

  const form = useForm({
    defaultValues,
    validators: {
      onChangeAsync: loginSchema,
    },
    onSubmit: async ({ value }) => {
      const response = await signIn("credentials", {
        redirect: false,
        ...value,
      });

      if (response?.status !== 200) {
        toast.error("Error", { description: "Login gagal" });
        return;
      }

      toast.success("Sukses", { description: "Login berhasil" });
      router.replace("/dashboard");
    },
  });

  return (
    <div className="flex min-h-screen max-lg:px-4 max-lg:flex-col max-lg:items-center max-lg:py-14 max-lg:gap-4">
      <div className="lg:w-1/3 xl:w-162.5 max-lg:-mt-30">
        <Image
          src="/login-illustrations.png"
          alt="Illustration Image"
          width={200}
          height={200}
          className="object-cover w-full h-full"
          loading="eager"
        />
      </div>
      <div className="flex-1 space-y-8 lg:pl-14 lg:max-w-182.5 lg:pt-50 lg:pr-4">
        <div className="gap-2">
          <h1 className="text-primary max-lg:text-center font-poppins text-4xl lg:text-6xl font-semibold">
            {AppConfig.Title}
          </h1>
          <p className="max-lg:text-center font-inter text-lg">
            Tingkatkan kemampuanmu, raih masa depan lebih baik
          </p>
        </div>
        <h1 className="font-semibold text-2xl font-poppins max-lg:text-center">
          Masuk
        </h1>
        <form
          className="flex flex-col gap-8 text-sm"
          onSubmit={(event) => {
            event.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field name="email">
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
                      type="email"
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
          </form.Field>

          <form.Field name="password">
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
          </form.Field>

          <div className="justify-between flex">
            <form.Field name="rememberMe">
              {(field) => {
                const { name, state, handleChange } = field;
                const { value = false, meta } = state;
                const { isTouched, errors } = meta;
                const isError = isTouched && errors.length > 0;
                return (
                  <div className="space-y-2">
                    <label htmlFor={name} className="flex items-center gap-2">
                      <Checkbox
                        id={name}
                        name={name}
                        checked={value}
                        onChange={(event) => handleChange(event.target.checked)}
                      />
                      Ingat saya
                    </label>
                    {isError && (
                      <span className="text-error text-sm">
                        {errors[0]?.message}
                      </span>
                    )}
                  </div>
                );
              }}
            </form.Field>

            <Link
              href="#"
              className="hover:underline focus-visible:underline focus-visible:outline-none"
            >
              Lupa password?
            </Link>
          </div>

          <form.Subscribe selector={(state) => [state.isSubmitting]}>
            {([isSubmitting]) => (
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {!isSubmitting ? (
                  "Masuk"
                ) : (
                  <>
                    <Loader className="animate-spin stroke-3 size-4" /> Harap
                    Tunggu
                  </>
                )}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </div>
    </div>
  );
}

export default LoginClient;
