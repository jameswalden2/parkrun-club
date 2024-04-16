/*
  Warnings:

  - A unique constraint covering the columns `[user_id,name]` on the table `parkrun_clubs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `parkrun_clubs_user_id_name_key` ON `parkrun_clubs`(`user_id`, `name`);
