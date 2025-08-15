import { z } from "zod";
export const SignUpSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "이름을 입력해주세요." })
      .regex(/^[a-zA-Z가-힣\s]+$/, {
        message: "이름은 문자만 입력할 수 있습니다.",
      }),
    email: z.string().email({ message: "올바른 이메일 형식을 입력해주세요." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
      .regex(/[A-Z]/, {
        message: "비밀번호는 최소 1개 이상의 대문자를 포함해야 합니다.",
      })
      .regex(/[a-z]/, {
        message: "비밀번호는 최소 1개 이상의 소문자를 포함해야 합니다.",
      })
      .regex(/[0-9]/, {
        message: "비밀번호는 최소 1개 이상의 숫자를 포함해야 합니다.",
      })
      .regex(/[\W]/, {
        message: "비밀번호는 최소 1개 이상의 특수문자를 포함해야 합니다.",
      }),
    passwordConfirm: z
      .string()
      .min(1, { message: "비밀번호를 다시 입력해주세요." }),
    phone: z.string().min(1, { message: "핸드폰번호를 입력해주세요." }),
    /* .regex(/^010-\d{4}-\d{4}$/, {
      message: "올바른 핸드폰번호 형식을 입력해주세요. (010-0000-0000)",
    }) */
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export const LoginSchema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식을 입력해주세요." }),
  password: z.string().min(1, { message: "패스워드를 입력해주세요." }),
});
