"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface ConsentFormProps {
  onConsentComplete: (consentData: {
    privacyConsent: boolean;
    parentalConsent: boolean;
  }) => void;
  onClose: () => void;
}

export function ConsentForm({ onConsentComplete, onClose }: ConsentFormProps) {
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [parentalConsent, setParentalConsent] = useState(false);

  const handleAllConsent = (checked: boolean) => {
    setPrivacyConsent(checked);
    setParentalConsent(checked);
  };

  const handleSubmit = () => {
    if (privacyConsent) {
      onConsentComplete({
        privacyConsent,
        parentalConsent,
      });
      onClose();
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>약관 동의</DialogTitle>
        <DialogDescription>
          너드수학 서비스 이용을 위한 약관에 동의해주세요
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-gray-600">너드수학 서비스 이용을 위한 약관에 동의해주세요</p>
        </div>

        {/* 개인정보 처리 동의 */}
        <div className="border rounded-lg p-6 space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="privacy-consent"
              checked={privacyConsent}
              onCheckedChange={(checked) => setPrivacyConsent(checked as boolean)}
              className="mt-1"
            />
            <div className="flex-1">
              <Label 
                htmlFor="privacy-consent" 
                className="text-sm font-medium cursor-pointer"
              >
                [필수] 개인정보 수집 및 이용 동의
              </Label>
              <div className="mt-2 p-4 bg-gray-50 rounded text-xs text-gray-600 max-h-32 overflow-y-auto">
                <p className="font-semibold mb-2">수집하는 개인정보 항목</p>
                <ul className="list-disc list-inside space-y-1 mb-4">
                  <li>필수항목: 이름, 이메일, 비밀번호, 휴대폰번호</li>
                  <li>선택항목: 닉네임, 학교명, 캐릭터 선택, 수학 수준</li>
                </ul>
                
                <p className="font-semibold mb-2">수집 및 이용 목적</p>
                <ul className="list-disc list-inside space-y-1 mb-4">
                  <li>회원제 서비스 이용에 따른 본인확인</li>
                  <li>학습 콘텐츠 제공 및 맞춤형 서비스</li>
                  <li>고객 상담 및 불만처리</li>
                </ul>
                
                <p className="font-semibold mb-2">보유 및 이용기간</p>
                <p>회원 탈퇴 시까지 (단, 관계법령에 의한 보존의무가 있는 경우 해당 기간까지)</p>
              </div>
            </div>
          </div>
        </div>

        {/* 만 14세 미만 부모 동의 */}
        <div className="border rounded-lg p-6 space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="parental-consent"
              checked={parentalConsent}
              onCheckedChange={(checked) => setParentalConsent(checked as boolean)}
              className="mt-1"
            />
            <div className="flex-1">
              <Label 
                htmlFor="parental-consent" 
                className="text-sm font-medium cursor-pointer"
              >
                [선택] 만 14세 미만 법정대리인 동의
              </Label>
              <div className="mt-2 p-4 bg-gray-50 rounded text-xs text-gray-600">
                <p className="mb-2">
                  만 14세 미만의 아동이 회원가입을 하는 경우, 
                  개인정보 수집·이용에 대하여 법정대리인의 동의가 필요합니다.
                </p>
                <p className="text-blue-600">
                  ※ 만 14세 이상이신 경우 체크하지 않으셔도 됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 전체 동의 */}
        <div className="border-t pt-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="all-consent"
              checked={privacyConsent && parentalConsent}
              onCheckedChange={(checked) => handleAllConsent(checked as boolean)}
              className="border-2 border-blue-500"
            />
            <Label 
              htmlFor="all-consent" 
              className="text-base font-semibold cursor-pointer"
            >
              전체 약관에 동의합니다
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!privacyConsent}
            className="bg-blue-600 hover:bg-blue-700"
          >
            동의 완료
          </Button>
        </DialogFooter>
      </div>
    </>
  );
}