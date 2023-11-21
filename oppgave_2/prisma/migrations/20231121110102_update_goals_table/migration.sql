/*
  Warnings:

  - You are about to drop the column `goal` on the `Goals` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Goals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "date" DATETIME,
    "comments" TEXT,
    "isCompetition" BOOLEAN NOT NULL,
    "goalCompetition" INTEGER,
    "goalNotCompetition" TEXT,
    "location" TEXT,
    "type" TEXT,
    "priority" INTEGER
);
INSERT INTO "new_Goals" ("comments", "date", "id", "isCompetition", "location", "name", "priority", "type") SELECT "comments", "date", "id", "isCompetition", "location", "name", "priority", "type" FROM "Goals";
DROP TABLE "Goals";
ALTER TABLE "new_Goals" RENAME TO "Goals";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
