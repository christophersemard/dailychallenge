-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'Trouver le film',
ADD COLUMN     "imgUrl" TEXT,
ADD COLUMN     "path" TEXT NOT NULL DEFAULT 'game-cinema-1';

-- AlterTable
ALTER TABLE "GameCategory" ADD COLUMN     "color" TEXT DEFAULT 'red';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "pseudo" DROP DEFAULT;
