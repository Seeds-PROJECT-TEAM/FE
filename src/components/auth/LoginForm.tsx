"use client";

import { FormCard } from "./FormCard";
import { Submit } from "./Submit";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useEffect } from "react";
import { useFormValidate } from "@/hooks/useFormVaildate";
import { LoginSchema } from "@/schemas/auth";
import { TLoginFormError } from "@/types/form";
import { FormMessage } from "./FormMessage";
import { useFormState } from "react-dom";
import { ConsentForm } from "./ConsentForm";

import { login } from "@/actions/login";
import toast from "react-hot-toast";

export function LoginForm() {
  const [error, action] = useFormState(login, undefined);
  const { errors, validateField } =
    useFormValidate<TLoginFormError>(LoginSchema);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validateField(name, value);
    /* console.log("name", name);
    console.log("value", value); */
  };

  useEffect(() => {
    if (error?.errorMessage) {
      toast.error(error.errorMessage);
    }
  }, [error]);
  return (
    <FormCard
      title="로그인"
      footer={{ label: "계정이 없으신가요?", href: "/signup" }}
    >
      <form action={action} className="space-y-6">
        {/* 이름 */}
        {/* <div className="space-y-1">
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            name="name"
            placeholder="이름을 입력해주세요"
            error={!!errors?.name}
            onChange={handleChange}
          />
          {errors?.name && <FormMessage message={errors?.name[0]} />}
        </div> */}
        {/* 이메일 */}
        <div className="space-y-1">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="nerdmath@abc.com"
            error={!!errors?.email}
            onChange={handleChange}
          />
          {errors?.email && <FormMessage message={errors?.email[0]} />}
        </div>
        {/* 비밀번호 */}
        <div className="space-y-1">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            name="password"
            placeholder="********"
            error={!!errors?.password}
            onChange={handleChange}
          />
          {errors?.password && <FormMessage message={errors?.password[0]} />}
        </div>
        <Submit className="w-full">로그인</Submit>
      </form>
    </FormCard>
  );
}
