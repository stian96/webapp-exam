/*
  Warnings:

  - You are about to drop the column `comments` on the `Goals` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Goals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "date" DATETIME,
    "comment" TEXT,
    "isCompetition" BOOLEAN NOT NULL,
    "goalCompetition" INTEGER,
    "goalNotCompetition" TEXT,
    "location" TEXT,
    "type" TEXT,
    "priority" INTEGER
);
INSERT INTO "new_Goals" ("date", "goalCompetition", "goalNotCompetition", "id", "isCompetition", "location", "name", "priority", "type") SELECT "date", "goalCompetition", "goalNotCompetition", "id", "isCompetition", "location", "name", "priority", "type" FROM "Goals";
DROP TABLE "Goals";
ALTER TABLE "new_Goals" RENAME TO "Goals";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
