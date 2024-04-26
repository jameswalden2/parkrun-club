/*
  Warnings:

  - You are about to drop the column `theme` on the `users` table. All the data in the column will be lost.
  - Made the column `theme` on table `user_settings` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user_settings" ALTER COLUMN "theme" SET NOT NULL,
ALTER COLUMN "theme" SET DEFAULT '#4287f5';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "theme";
