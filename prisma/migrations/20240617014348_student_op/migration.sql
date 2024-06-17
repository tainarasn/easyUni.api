-- DropForeignKey
ALTER TABLE `Activity` DROP FOREIGN KEY `Activity_studentId_fkey`;

-- AlterTable
ALTER TABLE `Activity` MODIFY `studentId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
