/*
  Warnings:

  - You are about to drop the column `colorEyesId` on the `Avatar` table. All the data in the column will be lost.
  - You are about to drop the column `colorMouthId` on the `Avatar` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Avatar" DROP CONSTRAINT "Avatar_colorEyesId_fkey";

-- DropForeignKey
ALTER TABLE "Avatar" DROP CONSTRAINT "Avatar_colorMouthId_fkey";

-- AlterTable
ALTER TABLE "Avatar" DROP COLUMN "colorEyesId",
DROP COLUMN "colorMouthId";
