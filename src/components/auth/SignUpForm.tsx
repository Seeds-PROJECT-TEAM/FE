"use client";

import { FormCard } from "./FormCard";
import { Submit } from "./Submit";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

export default function SignUpForm() {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log("name", name);
    console.log("value", value);
  };

  return (
    <FormCard
      title="회원가입"
      footer={{ label: "이미 계정이 있으신가요?", href: "/login" }}
    >
      <form className="space-y-6">
        {/* 이름 */}
        <div className="space-y-1">
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            name="name"
            placeholder="이름을 입력해주세요"
            onChange={handleChange}
          />
        </div>
        {/* 이메일 */}
        <div className="space-y-1">
          <Label htmlFor="name">이메일</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="nertmath@abc.com"
            onChange={handleChange}
          />
        </div>
        {/* 비밀번호 */}
        <div className="space-y-1">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            name="password"
            placeholder="********"
            onChange={handleChange}
          />
        </div>
        <Submit className="w-full">가입하기</Submit>
      </form>
    </FormCard>
  );
}
