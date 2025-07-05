-- CreateTable
CREATE TABLE "DataArtist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "listeners" INTEGER NOT NULL,
    "source" TEXT NOT NULL,
    "mbid" TEXT,
    "type" TEXT NOT NULL,
    "country" TEXT,
    "gender" TEXT,
    "startDate" TIMESTAMP(3),
    "isDead" BOOLEAN,
    "mainGenres" TEXT[],
    "aliases" TEXT[],
    "members" TEXT[],
    "imageUrl" TEXT,
    "albumsJson" JSONB,
    "firstAlbumDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DataArtist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataSong" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "previewUrl" TEXT,
    "deezerLink" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "rank" INTEGER,
    "explicit" BOOLEAN NOT NULL,
    "artistId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DataSong_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameMusic1Days" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "artistId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameMusic1Days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameMusic1Tries" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "dayId" INTEGER NOT NULL,
    "guess" TEXT NOT NULL,
    "correct" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameMusic1Tries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DataArtist_name_key" ON "DataArtist"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DataArtist_mbid_key" ON "DataArtist"("mbid");

-- CreateIndex
CREATE UNIQUE INDEX "GameMusic1Days_date_key" ON "GameMusic1Days"("date");

-- AddForeignKey
ALTER TABLE "DataSong" ADD CONSTRAINT "DataSong_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "DataArtist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameMusic1Days" ADD CONSTRAINT "GameMusic1Days_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "DataArtist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameMusic1Tries" ADD CONSTRAINT "GameMusic1Tries_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "GameMusic1Days"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
