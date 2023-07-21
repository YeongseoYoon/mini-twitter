/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Favorite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Tweet` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("avatar", "createdAt", "email", "id", "name", "password", "updatedAt") SELECT "avatar", "createdAt", "email", "id", "name", "password", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Favorite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "tweetId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Favorite_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Favorite" ("createdAt", "id", "tweetId", "updatedAt", "userId") SELECT "createdAt", "id", "tweetId", "updatedAt", "userId" FROM "Favorite";
DROP TABLE "Favorite";
ALTER TABLE "new_Favorite" RENAME TO "Favorite";
CREATE TABLE "new_Tweet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    CONSTRAINT "Tweet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Tweet" ("content", "createdAt", "id", "updatedAt", "userId") SELECT "content", "createdAt", "id", "updatedAt", "userId" FROM "Tweet";
DROP TABLE "Tweet";
ALTER TABLE "new_Tweet" RENAME TO "Tweet";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
