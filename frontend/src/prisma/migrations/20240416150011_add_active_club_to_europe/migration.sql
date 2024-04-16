/*
  Warnings:

  - A unique constraint covering the columns `[userId,parkrunClubId]` on the table `parkrun_club_memberships` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `activeParkrunClubId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `parkrun_club_memberships_userId_parkrunClubId_key` ON `parkrun_club_memberships`(`userId`, `parkrunClubId`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_activeParkrunClubId_fkey` FOREIGN KEY (`activeParkrunClubId`) REFERENCES `parkrun_clubs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
