/*
  Warnings:

  - You are about to drop the column `attempts` on the `UserEvent` table. All the data in the column will be lost.
  - You are about to drop the column `gameCategoryId` on the `UserEvent` table. All the data in the column will be lost.
  - You are about to drop the column `gameId` on the `UserEvent` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `UserEvent` table. All the data in the column will be lost.
  - You are about to drop the column `xpGained` on the `UserEvent` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserEvent" DROP CONSTRAINT "UserEvent_gameCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "UserEvent" DROP CONSTRAINT "UserEvent_gameId_fkey";

-- AlterTable
ALTER TABLE "UserEvent" DROP COLUMN "attempts",
DROP COLUMN "gameCategoryId",
DROP COLUMN "gameId",
DROP COLUMN "score",
DROP COLUMN "xpGained",
ADD COLUMN     "gameResultId" INTEGER;

-- AddForeignKey
ALTER TABLE "UserEvent" ADD CONSTRAINT "UserEvent_gameResultId_fkey" FOREIGN KEY ("gameResultId") REFERENCES "GameResult"("id") ON DELETE SET NULL ON UPDATE CASCADE;
