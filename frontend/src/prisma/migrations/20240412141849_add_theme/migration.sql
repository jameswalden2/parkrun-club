-- AlterTable
ALTER TABLE `completed_parkruns` ADD COLUMN `no_of_completions` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `theme` VARCHAR(191) NULL;
