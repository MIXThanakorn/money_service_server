-- CreateTable
CREATE TABLE `user_tb` (
    `userID` INTEGER NOT NULL AUTO_INCREMENT,
    `userFullName` VARCHAR(100) NOT NULL,
    `userBirthDate` VARCHAR(100) NOT NULL,
    `userName` VARCHAR(50) NOT NULL,
    `userPassword` VARCHAR(50) NOT NULL,
    `userImage` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `money_tb` (
    `moneyID` INTEGER NOT NULL AUTO_INCREMENT,
    `moneyDetail` VARCHAR(100) NOT NULL,
    `moneyDate` VARCHAR(100) NOT NULL,
    `moneyInOut` INTEGER NOT NULL,
    `moneyType` INTEGER NOT NULL,
    `userID` INTEGER NOT NULL,

    PRIMARY KEY (`moneyID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
