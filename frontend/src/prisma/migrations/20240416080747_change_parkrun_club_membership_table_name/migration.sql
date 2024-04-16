/*
  Warnings:

  - You are about to drop the `ParkrunClubMembership` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ParkrunClubMembership` DROP FOREIGN KEY `ParkrunClubMembership_parkrunClubId_fkey`;

-- DropForeignKey
ALTER TABLE `ParkrunClubMembership` DROP FOREIGN KEY `ParkrunClubMembership_userId_fkey`;

-- DropTable
DROP TABLE `ParkrunClubMembership`;

-- CreateTable
CREATE TABLE `parkrun_club_memberships` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `parkrunClubId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `parkrun_club_memberships` ADD CONSTRAINT `parkrun_club_memberships_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `parkrun_club_memberships` ADD CONSTRAINT `parkrun_club_memberships_parkrunClubId_fkey` FOREIGN KEY (`parkrunClubId`) REFERENCES `parkrun_clubs`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
