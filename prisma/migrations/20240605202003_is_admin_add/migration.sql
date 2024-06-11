/*
  Warnings:

  - You are about to drop the column `courseId` on the `Activity` table. All the data in the column will be lost.
  - Made the column `studentId` on table `Activity` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Activity` DROP FOREIGN KEY `Activity_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Activity` DROP FOREIGN KEY `Activity_studentId_fkey`;

-- AlterTable
ALTER TABLE `Activity` DROP COLUMN `courseId`,
    MODIFY `studentId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `isAdmin` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
