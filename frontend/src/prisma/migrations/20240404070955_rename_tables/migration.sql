/*
  Warnings:

  - You are about to drop the `CompletedParkrun` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Parkrun` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `CompletedParkrun`;

-- DropTable
DROP TABLE `Parkrun`;

-- CreateTable
CREATE TABLE `parkruns` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `polygonGeometry` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `completed_parkruns` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
