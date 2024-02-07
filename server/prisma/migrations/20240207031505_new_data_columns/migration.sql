-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "videoid" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "totalLikes" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "videoLink" TEXT NOT NULL,
    "thumbnailLink" TEXT NOT NULL,
    "datePosted" TIMESTAMP(3) NOT NULL,
    "tag" TEXT[],
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("videoid")
);

-- CreateTable
CREATE TABLE "Comment" (
    "commentId" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "totalLikes" INTEGER NOT NULL,
    "videoId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("commentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("videoid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
