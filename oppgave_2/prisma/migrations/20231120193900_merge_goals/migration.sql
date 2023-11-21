-- CreateTable
CREATE TABLE "ExampleTable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "col1" TEXT NOT NULL,
    "col2" TEXT NOT NULL,
    "col3" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Performers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "sport" TEXT NOT NULL,
    "heartRate" INTEGER NOT NULL,
    "watt" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Goals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "date" DATETIME,
    "comments" TEXT,
    "isCompetition" BOOLEAN NOT NULL,
    "goal" TEXT,
    "location" TEXT,
    "type" TEXT,
    "priority" INTEGER
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Answers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "questionId" TEXT NOT NULL,
    "answerText" TEXT,
    "answerNumber" INTEGER,
    "answerEmoji" TEXT,
    CONSTRAINT "Answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Intervals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "duration" INTEGER NOT NULL,
    "intensity" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "IntervalResults" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "intervalId" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "intensityMin" INTEGER NOT NULL,
    "intensityMax" INTEGER NOT NULL,
    "intensityAvg" INTEGER NOT NULL,
    "pulseMin" INTEGER NOT NULL,
    "pulseMax" INTEGER NOT NULL,
    "pulseAvg" INTEGER NOT NULL,
    "speedMin" INTEGER NOT NULL,
    "speedMax" INTEGER NOT NULL,
    "speedAvg" INTEGER NOT NULL,
    "wattMin" INTEGER NOT NULL,
    "wattMax" INTEGER NOT NULL,
    "wattAvg" INTEGER NOT NULL,
    CONSTRAINT "IntervalResults_intervalId_fkey" FOREIGN KEY ("intervalId") REFERENCES "Intervals" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "type" TEXT,
    "isTemplate" BOOLEAN NOT NULL,
    "performerId" TEXT,
    "slug" TEXT,
    "intensityParam" INTEGER,
    "wattParam" INTEGER,
    "speedParam" INTEGER,
    "pulseParam" INTEGER,
    CONSTRAINT "Sessions_performerId_fkey" FOREIGN KEY ("performerId") REFERENCES "Performers" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SessionActivity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "sessionId" TEXT NOT NULL,
    "goalId" TEXT,
    "performerId" TEXT NOT NULL,
    CONSTRAINT "SessionActivity_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Sessions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SessionActivity_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goals" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "SessionActivity_performerId_fkey" FOREIGN KEY ("performerId") REFERENCES "Performers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reports" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionActivityId" TEXT NOT NULL,
    CONSTRAINT "Reports_sessionActivityId_fkey" FOREIGN KEY ("sessionActivityId") REFERENCES "SessionActivity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PerformerGoals" (
    "performerId" TEXT NOT NULL,
    "goalId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    PRIMARY KEY ("performerId", "goalId", "year"),
    CONSTRAINT "PerformerGoals_performerId_fkey" FOREIGN KEY ("performerId") REFERENCES "Performers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PerformerGoals_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goals" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SessionQuestions" (
    "sessionId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,

    PRIMARY KEY ("sessionId", "questionId"),
    CONSTRAINT "SessionQuestions_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Sessions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SessionQuestions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SessionIntervals" (
    "sessionId" TEXT NOT NULL,
    "intervalId" TEXT NOT NULL,

    PRIMARY KEY ("sessionId", "intervalId"),
    CONSTRAINT "SessionIntervals_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Sessions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SessionIntervals_intervalId_fkey" FOREIGN KEY ("intervalId") REFERENCES "Intervals" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SessionTags" (
    "sessionId" TEXT NOT NULL,
    "tag" TEXT NOT NULL,

    PRIMARY KEY ("sessionId", "tag"),
    CONSTRAINT "SessionTags_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Sessions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReportIntervalResults" (
    "reportId" TEXT NOT NULL,
    "intervalResultId" TEXT NOT NULL,

    PRIMARY KEY ("reportId", "intervalResultId"),
    CONSTRAINT "ReportIntervalResults_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Reports" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ReportIntervalResults_intervalResultId_fkey" FOREIGN KEY ("intervalResultId") REFERENCES "IntervalResults" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReportAnswers" (
    "reportId" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,

    PRIMARY KEY ("reportId", "answerId"),
    CONSTRAINT "ReportAnswers_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Reports" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ReportAnswers_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Performers_userId_key" ON "Performers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Sessions_slug_key" ON "Sessions"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Reports_sessionActivityId_key" ON "Reports"("sessionActivityId");
