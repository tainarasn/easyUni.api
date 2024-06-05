-- AlterTable
ALTER TABLE `Activity` ADD COLUMN `studentId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Materia` ADD COLUMN `studentId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Materia` ADD CONSTRAINT `Materia_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
