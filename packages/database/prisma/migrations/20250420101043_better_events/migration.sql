/*
  Warnings:

  - You are about to drop the column `details` on the `UserEvent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserEvent" DROP COLUMN "details",
ADD COLUMN     "attempts" INTEGER,
ADD COLUMN     "avatarAssetId" INTEGER,
ADD COLUMN     "friendId" INTEGER,
ADD COLUMN     "gameCategoryId" INTEGER,
ADD COLUMN     "gameId" INTEGER,
ADD COLUMN     "levelUp" INTEGER,
ADD COLUMN     "score" INTEGER,
ADD COLUMN     "xpGained" INTEGER;

-- AddForeignKey
ALTER TABLE "UserEvent" ADD CONSTRAINT "UserEvent_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEvent" ADD CONSTRAINT "UserEvent_avatarAssetId_fkey" FOREIGN KEY ("avatarAssetId") REFERENCES "AvatarAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEvent" ADD CONSTRAINT "UserEvent_gameCategoryId_fkey" FOREIGN KEY ("gameCategoryId") REFERENCES "GameCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEvent" ADD CONSTRAINT "UserEvent_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "Friend"("id") ON DELETE SET NULL ON UPDATE CASCADE;
