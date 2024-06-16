/*
  Warnings:

  - You are about to drop the column `courseId` on the `Student` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Student` DROP FOREIGN KEY `Student_courseId_fkey`;

-- AlterTable
ALTER TABLE `Course` ADD COLUMN `studentId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Student` DROP COLUMN `courseId`;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
