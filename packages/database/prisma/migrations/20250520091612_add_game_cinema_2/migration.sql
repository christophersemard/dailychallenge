-- CreateTable
CREATE TABLE "GameCinema2Days" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameCinema2Days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameCinema2Tries" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "guess" TEXT NOT NULL,
    "correct" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameCinema2Tries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameCinema2Days" ADD CONSTRAINT "GameCinema2Days_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "DataMovie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameCinema2Tries" ADD CONSTRAINT "GameCinema2Tries_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "GameCinema2Days"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
