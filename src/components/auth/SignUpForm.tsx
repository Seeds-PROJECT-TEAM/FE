"use client";

import { FormCard } from "./FormCard";
import { Submit } from "./Submit";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useEffect, useState } from "react";
import { useFormValidate } from "@/hooks/useFormVaildate";
import { SignUpSchema } from "@/schemas/auth";
import { TSignUpFormError } from "@/types/form";
import { FormMessage } from "./FormMessage";
import { useFormState } from "react-dom";
import { signUp } from "@/actions/signup";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ConsentForm } from "./ConsentForm";

export default function SignUpForm() {
  const [error, action] = useFormState(signUp, undefined);
  const { errors, validateField } =
    useFormValidate<TSignUpFormError>(SignUpSchema);

  // 동의 상태 관리
  const [isConsentCompleted, setIsConsentCompleted] = useState(false);
  const [consentData, setConsentData] = useState<{
    privacyConsent: boolean;
    parentalConsent: boolean;
  } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  const handleConsentComplete = (consent: {
    privacyConsent: boolean;
    parentalConsent: boolean;
  }) => {
    setConsentData(consent);
    setIsConsentCompleted(true);
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (error?.errorMessage && !error.errorMessage.includes('NEXT_REDIRECT')) {
      toast.error(error.errorMessage);
    }
  }, [error]);

  return (
    <FormCard
      title="회원가입"
      footer={{ label: "이미 계정이 있으신가요?", href: "/login" }}
    >
      <form action={action} className="space-y-6">
        {/* 동의 정보를 hidden input으로 전달 */}
        {consentData && (
          <>
            <input type="hidden" name="privacyConsent" value={consentData.privacyConsent.toString()} />
            <input type="hidden" name="parentalConsent" value={consentData.parentalConsent.toString()} />
          </>
        )}
        {/* 이름 */}
        <div className="space-y-1">
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            name="name"
            placeholder="이름을 입력해주세요"
            error={!!errors?.name}
            onChange={handleChange}
          />
          {errors?.name && <FormMessage message={errors?.name[0]} />}
        </div>
        {/* 이메일 */}
        <div className="space-y-1">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="nertmath@abc.com"
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
            type="password"
            placeholder="********"
            error={!!errors?.password}
            onChange={handleChange}
          />
          {errors?.password && <FormMessage message={errors?.password[0]} />}
        </div>
        
        {/* 비밀번호 확인 */}
        <div className="space-y-1">
          <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
          <Input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            error={!!errors?.passwordConfirm}
            onChange={handleChange}
          />
          {errors?.passwordConfirm && <FormMessage message={errors?.passwordConfirm[0]} />}
        </div>

        {/* 핸드폰번호 */}
        <div className="space-y-1">
          <Label htmlFor="phone">핸드폰번호</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="010-0000-0000"
            error={!!errors?.phone}
            onChange={handleChange}
          />
          {errors?.phone && <FormMessage message={errors?.phone[0]} />}
        </div>
        {/* 동의 상태 표시 */}
        <div className="text-center py-4">
          {isConsentCompleted ? (
            <p className="text-green-800 text-m">
              ✓ 약관 동의가 완료되었습니다
            </p>
          ) : (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  약관 동의하기 (필수)
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <ConsentForm
                  onConsentComplete={handleConsentComplete}
                  onClose={() => setIsDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          )}
        </div>

        <Submit className="w-full">가입하기</Submit>
      </form>
    </FormCard>
  );
}
