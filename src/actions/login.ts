"use server";

import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schemas/auth";
import { getDB } from "@/db";
import { ObjectId } from "mongodb";
import { compare } from "bcryptjs";
import { createSession } from "./session";
import { redirect } from "next/navigation";

export const login = async (_: any, formData: FormData) => {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errorMessage: "잘못된 입력값이 있습니다.",
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return {
        errorMessage: "존재하지 않는 사용자입니다. 회원가입을 해주세요.",
      };
    }
    const { _id, name, password: dbPassword } = existingUser;
    const passwordMatch = password === dbPassword;
    //const passwordMatch = await compare(password, dbPassword); 해시화 했을때 코드

    if (!passwordMatch) {
      return {
        errorMessage: "비밀번호가 일치하지 않습니다.",
      };
    }

    await createSession({ id: _id!.toString(), name });
  } catch (error) {
    console.error("error", error);
    return {
      errorMessage: "문제가 발생했습니다.",
    };
  }
  redirect("/profile-setup");
};
