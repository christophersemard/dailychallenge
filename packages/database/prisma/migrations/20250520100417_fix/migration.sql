/*
  Warnings:

  - You are about to drop the column `gameId` on the `GameCinema2Tries` table. All the data in the column will be lost.
  - Added the required column `dayId` to the `GameCinema2Tries` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GameCinema2Tries" DROP CONSTRAINT "GameCinema2Tries_gameId_fkey";

-- AlterTable
ALTER TABLE "GameCinema2Tries" DROP COLUMN "gameId",
ADD COLUMN     "dayId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "GameCinema2Tries" ADD CONSTRAINT "GameCinema2Tries_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "GameCinema2Days"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
