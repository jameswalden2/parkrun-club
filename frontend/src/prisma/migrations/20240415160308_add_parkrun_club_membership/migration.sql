-- CreateTable
CREATE TABLE `ParkrunClubMembership` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `parkrunClubId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ParkrunClubMembership` ADD CONSTRAINT `ParkrunClubMembership_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ParkrunClubMembership` ADD CONSTRAINT `ParkrunClubMembership_parkrunClubId_fkey` FOREIGN KEY (`parkrunClubId`) REFERENCES `parkrun_clubs`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
