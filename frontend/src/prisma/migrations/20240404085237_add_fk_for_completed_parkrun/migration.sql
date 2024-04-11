/*
  Warnings:

  - You are about to drop the column `name` on the `completed_parkruns` table. All the data in the column will be lost.
  - Added the required column `parkrun_id` to the `completed_parkruns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `completed_parkruns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `completed_parkruns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `completed_parkruns` DROP COLUMN `name`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `parkrun_id` INTEGER NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `completed_parkruns` ADD CONSTRAINT `completed_parkruns_parkrun_id_fkey` FOREIGN KEY (`parkrun_id`) REFERENCES `parkruns`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `completed_parkruns` ADD CONSTRAINT `completed_parkruns_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
