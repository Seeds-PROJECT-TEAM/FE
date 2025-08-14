import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  email: string;
  password: string;
  name: string;
  phone: string;
  privacyConsent: boolean;
  parentalConsent?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
  phone: string;
  privacyConsent: boolean;
  parentalConsent?: boolean;
}