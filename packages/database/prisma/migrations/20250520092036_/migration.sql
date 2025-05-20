/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `GameCinema2Days` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `GameCinema2Days` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameCinema2Days" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GameCinema2Days_date_key" ON "GameCinema2Days"("date");
