import { User } from "@prisma/client";

export default interface MutationResult {
  isSuccess: boolean;
  error?: string;
}

export type UserWithoutPassword = Omit<User, "password">;
