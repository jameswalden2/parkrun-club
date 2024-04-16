/*
  Warnings:

  - A unique constraint covering the columns `[uniqueCode]` on the table `parkrun_clubs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `parkrun_clubs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uniqueCode` to the `parkrun_clubs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `parkrun_clubs` ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `uniqueCode` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `parkrun_clubs_uniqueCode_key` ON `parkrun_clubs`(`uniqueCode`);
