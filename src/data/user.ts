import { getDB } from "@/db";
import { User } from "@/db/schema";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const db = await getDB();
    const collection = db.collection<User>("users");
    
    const existingUser = await collection.findOne({ email });

    if (!existingUser) {
      return null;
    }

    return existingUser;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};
