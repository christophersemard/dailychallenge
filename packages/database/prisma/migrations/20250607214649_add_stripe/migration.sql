/*
  Warnings:

  - You are about to drop the column `isVip` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "VipPlan" AS ENUM ('monthly', 'yearly');

-- CreateEnum
CREATE TYPE "VipStatus" AS ENUM ('active', 'cancelled', 'expired');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isVip";

-- CreateTable
CREATE TABLE "VipSubscription" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "stripeSubscriptionId" TEXT,
    "stripeCustomerId" TEXT,
    "plan" "VipPlan" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "status" "VipStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VipSubscription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VipSubscription" ADD CONSTRAINT "VipSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
