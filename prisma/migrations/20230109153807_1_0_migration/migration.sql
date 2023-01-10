-- CreateTable
CREATE TABLE `Url` (
    `id` VARCHAR(191) NOT NULL,
    `originalUrl` VARCHAR(191) NOT NULL,
    `shortUrl` VARCHAR(191) NOT NULL,
    `urlCode` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Url_urlCode_key`(`urlCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UrlAnalytic` (
    `id` VARCHAR(191) NOT NULL,
    `url_id` VARCHAR(191) NOT NULL,
    `clicked` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UrlAnalytic` ADD CONSTRAINT `UrlAnalytic_url_id_fkey` FOREIGN KEY (`url_id`) REFERENCES `Url`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
