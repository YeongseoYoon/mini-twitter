import { User } from "@prisma/client";

export default interface MutationResult {
  ok: boolean;
  error?: string;
}

export type UserWithoutPassword = Omit<User, "password">;
