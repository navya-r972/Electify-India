/*
  Warnings:

  - You are about to drop the column `description` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `Activity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "description",
DROP COLUMN "metadata",
ADD COLUMN     "title" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "url" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Progress" ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "streak" INTEGER NOT NULL DEFAULT 0;
