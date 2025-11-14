import bcrypt from "bcryptjs";
import { PASSWORD_SALT_ROUNDS } from "./auth.constants";

// Hash a plain text password
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
};

// Compare plain text password with hashed password
export const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
