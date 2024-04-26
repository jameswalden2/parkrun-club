/*
  Warnings:

  - Made the column `theme` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "theme" SET NOT NULL,
ALTER COLUMN "theme" SET DEFAULT '#4287f5';
