export type TSignUpFormError = {
  name?: string[];
  email?: string[];
  password?: string[];
  passwordConfirm?: string[];
  phone?: string[];
};

export type TLoginFormError = {
  email?: string[];
  password?: string[];
};
