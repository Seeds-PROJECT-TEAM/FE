"use server";

import { getUserByEmail } from "@/data/user";
import { SignUpSchema } from "@/schemas/auth";
import { getDB } from "@/db";

export const signUp = async (_: any, formData: FormData) => {
  // 1. vaildate Fields
  console.log("FormData 받은 값:", {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const validatedFields = SignUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  console.log("유효성 검증 결과:", validatedFields);

  if (!validatedFields.success) {
    console.log("유효성 검증 실패:", validatedFields.error);
    return {
      errorMesage: "잘못된 입력값이 있습니다.",
    };
  }

  // 2. 존재하는 사용자인지 체크
  const { email, name, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return {
      errorMessage: "이미 존재하는 사용자 입니다.",
    };
  }

  // const hashPassword =await 나중에 하자..

  // 3. insert db
  try {
    const db = await getDB();
    const collection = db.collection("users");
    const userData = {
      name,
      email,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(userData);

    // 4. 성공/실패처리
    return {
      success: "회원가입이 완료되었습니다.",
    };
  } catch (error) {
    console.error("회원가입 에러:", error);
    return {
      errorMessage: "회원가입에 실패했습니다.",
    };
  }
};
