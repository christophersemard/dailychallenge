-- CreateTable
CREATE TABLE "DataMovie" (
    "id" SERIAL NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "originalTitle" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "runtime" INTEGER,
    "director" TEXT,
    "actors" TEXT,
    "genres" TEXT NOT NULL,
    "synopsis" TEXT,
    "production" TEXT,
    "country" TEXT,
    "language" TEXT,
    "voteAverage" DOUBLE PRECISION,
    "budget" INTEGER,
    "keywords" TEXT,
    "posterPath" TEXT,
    "backdropPath" TEXT,
    "image1" TEXT,
    "image2" TEXT,
    "image3" TEXT,
    "image4" TEXT,
    "image5" TEXT,
    "image6" TEXT,
    "image7" TEXT,
    "image8" TEXT,
    "image9" TEXT,
    "image10" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DataMovie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameCinema1Days" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "movieId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameCinema1Days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameCinema1Tries" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "dayId" INTEGER NOT NULL,
    "guess" TEXT NOT NULL,
    "attempt" INTEGER NOT NULL,
    "correct" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameCinema1Tries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DataMovie_tmdbId_key" ON "DataMovie"("tmdbId");

-- CreateIndex
CREATE UNIQUE INDEX "GameCinema1Days_date_key" ON "GameCinema1Days"("date");

-- AddForeignKey
ALTER TABLE "GameCinema1Days" ADD CONSTRAINT "GameCinema1Days_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "DataMovie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameCinema1Tries" ADD CONSTRAINT "GameCinema1Tries_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "GameCinema1Days"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
