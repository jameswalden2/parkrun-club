/*
  Warnings:

  - You are about to drop the column `parkrunClubId` on the `parkrun_club_memberships` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `parkrun_club_memberships` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,parkrun_club_id]` on the table `parkrun_club_memberships` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `parkrun_club_id` to the `parkrun_club_memberships` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `parkrun_club_memberships` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `parkrun_club_memberships` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `parkrun_club_memberships` DROP FOREIGN KEY `parkrun_club_memberships_parkrunClubId_fkey`;

-- DropForeignKey
ALTER TABLE `parkrun_club_memberships` DROP FOREIGN KEY `parkrun_club_memberships_userId_fkey`;

-- DropIndex
DROP INDEX `parkrun_club_memberships_userId_parkrunClubId_key` ON `parkrun_club_memberships`;

-- AlterTable
ALTER TABLE `parkrun_club_memberships` DROP COLUMN `parkrunClubId`,
    DROP COLUMN `userId`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `parkrun_club_id` INTEGER NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `user_settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `theme` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_settings_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `parkrun_club_memberships_user_id_parkrun_club_id_key` ON `parkrun_club_memberships`(`user_id`, `parkrun_club_id`);

-- AddForeignKey
ALTER TABLE `user_settings` ADD CONSTRAINT `user_settings_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `parkrun_club_memberships` ADD CONSTRAINT `parkrun_club_memberships_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `parkrun_club_memberships` ADD CONSTRAINT `parkrun_club_memberships_parkrun_club_id_fkey` FOREIGN KEY (`parkrun_club_id`) REFERENCES `parkrun_clubs`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
