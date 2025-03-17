-- AlterTable
ALTER TABLE "Friend" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "GameCategory" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "GameResult" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "GameResult_score_idx" ON "GameResult"("score");

-- CreateIndex
CREATE INDEX "GameResult_date_idx" ON "GameResult"("date");
