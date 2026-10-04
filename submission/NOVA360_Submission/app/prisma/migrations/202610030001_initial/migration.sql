-- CreateTable
CREATE TABLE "SourceDocument" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "checksum" TEXT NOT NULL,
    "extractedText" TEXT NOT NULL,
    "data" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "Citation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sourceId" TEXT NOT NULL,
    "locatorType" TEXT NOT NULL,
    "locator" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "en" JSONB NOT NULL,
    CONSTRAINT "Citation_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "SourceDocument" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Fact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subject" TEXT NOT NULL,
    "predicate" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "informationState" TEXT NOT NULL,
    "validFrom" TEXT NOT NULL,
    "validUntil" TEXT,
    "data" JSONB NOT NULL,
    "en" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "FactEvidence" (
    "factId" TEXT NOT NULL,
    "citationId" TEXT NOT NULL,

    PRIMARY KEY ("factId", "citationId"),
    CONSTRAINT "FactEvidence_factId_fkey" FOREIGN KEY ("factId") REFERENCES "Fact" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FactEvidence_citationId_fkey" FOREIGN KEY ("citationId") REFERENCES "Citation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "questionFr" TEXT NOT NULL,
    "questionEn" TEXT NOT NULL,
    "answerFr" TEXT NOT NULL,
    "answerEn" TEXT NOT NULL,
    "nuanceFr" TEXT NOT NULL,
    "nuanceEn" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "isOfficial" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL,
    "tags" TEXT NOT NULL DEFAULT '',
    "data" JSONB NOT NULL,
    "en" JSONB NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'seed',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "QuestionEvidence" (
    "questionId" TEXT NOT NULL,
    "citationId" TEXT NOT NULL,

    PRIMARY KEY ("questionId", "citationId"),
    CONSTRAINT "QuestionEvidence_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "QuestionEvidence_citationId_fkey" FOREIGN KEY ("citationId") REFERENCES "Citation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "QuestionFact" (
    "questionId" TEXT NOT NULL,
    "factId" TEXT NOT NULL,

    PRIMARY KEY ("questionId", "factId"),
    CONSTRAINT "QuestionFact_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "QuestionFact_factId_fkey" FOREIGN KEY ("factId") REFERENCES "Fact" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "recommendationType" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "en" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "Decision" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "approvedAt" TEXT,
    "data" JSONB NOT NULL,
    "en" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "TimelineEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "en" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "Contradiction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "currentFactId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "en" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "en" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "GoLiveCondition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "factId" TEXT NOT NULL,
    "actionId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "en" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "ProjectSnapshot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timestamp" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "immutable" BOOLEAN NOT NULL,
    "checksum" TEXT NOT NULL,
    "data" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "ImpactEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sequence" INTEGER NOT NULL,
    "occurredAt" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ImpactChange" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "factId" TEXT NOT NULL,
    "changeType" TEXT NOT NULL,
    "beforeValue" TEXT,
    "afterValue" TEXT NOT NULL,
    "informationState" TEXT NOT NULL,
    "rationale" TEXT NOT NULL,
    CONSTRAINT "ImpactChange_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "ImpactEvent" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AdminAudit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "entityId" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "before" JSONB,
    "after" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL DEFAULT 'admin'
);

-- CreateIndex
CREATE UNIQUE INDEX "SourceDocument_path_key" ON "SourceDocument"("path");

-- CreateIndex
CREATE UNIQUE INDEX "GoLiveCondition_factId_key" ON "GoLiveCondition"("factId");

-- CreateIndex
CREATE UNIQUE INDEX "GoLiveCondition_actionId_key" ON "GoLiveCondition"("actionId");

-- CreateIndex
CREATE UNIQUE INDEX "ImpactEvent_sequence_key" ON "ImpactEvent"("sequence");

-- Immutable source-derived state; editable English presentation remains separate.
CREATE TRIGGER protect_baseline_update BEFORE UPDATE ON ProjectSnapshot WHEN OLD.immutable = 1 BEGIN SELECT RAISE(ABORT, 'Immutable baseline'); END;
CREATE TRIGGER protect_baseline_delete BEFORE DELETE ON ProjectSnapshot WHEN OLD.immutable = 1 BEGIN SELECT RAISE(ABORT, 'Immutable baseline'); END;
CREATE TRIGGER protect_SourceDocument_UPDATE BEFORE UPDATE ON "SourceDocument" BEGIN SELECT RAISE(ABORT, 'Read-only evidence-derived entity'); END;
CREATE TRIGGER protect_SourceDocument_DELETE BEFORE DELETE ON "SourceDocument" BEGIN SELECT RAISE(ABORT, 'Read-only evidence-derived entity'); END;
CREATE TRIGGER protect_Citation_UPDATE BEFORE UPDATE ON "Citation" BEGIN SELECT RAISE(ABORT, 'Read-only evidence-derived entity'); END;
CREATE TRIGGER protect_Citation_DELETE BEFORE DELETE ON "Citation" BEGIN SELECT RAISE(ABORT, 'Read-only evidence-derived entity'); END;
CREATE TRIGGER protect_Fact_UPDATE BEFORE UPDATE ON "Fact" BEGIN SELECT RAISE(ABORT, 'Read-only evidence-derived entity'); END;
CREATE TRIGGER protect_Fact_DELETE BEFORE DELETE ON "Fact" BEGIN SELECT RAISE(ABORT, 'Read-only evidence-derived entity'); END;
CREATE TRIGGER protect_Action_UPDATE BEFORE UPDATE ON "Action" BEGIN SELECT RAISE(ABORT, 'Read-only evidence-derived entity'); END;
CREATE TRIGGER protect_Action_DELETE BEFORE DELETE ON "Action" BEGIN SELECT RAISE(ABORT, 'Read-only evidence-derived entity'); END;
CREATE TRIGGER protect_Decision_UPDATE BEFORE UPDATE ON "Decision" BEGIN SELECT RAISE(ABORT, 'Read-only evidence-derived entity'); END;
CREATE TRIGGER protect_Decision_DELETE BEFORE DELETE ON "Decision" BEGIN SELECT RAISE(ABORT, 'Read-only evidence-derived entity'); END;
CREATE TRIGGER protect_TimelineEvent_UPDATE BEFORE UPDATE ON "TimelineEvent" BEGIN SELECT RAISE(ABORT, 'Read-only evidence-derived entity'); END;
CREATE TRIGGER protect_TimelineEvent_DELETE BEFORE DELETE ON "TimelineEvent" BEGIN SELECT RAISE(ABORT, 'Read-only evidence-derived entity'); END;
CREATE TRIGGER protect_Contradiction_UPDATE BEFORE UPDATE ON "Contradiction" BEGIN SELECT RAISE(ABORT, 'Read-only evidence-derived entity'); END;
CREATE TRIGGER protect_Contradiction_DELETE BEFORE DELETE ON "Contradiction" BEGIN SELECT RAISE(ABORT, 'Read-only evidence-derived entity'); END;
CREATE TRIGGER protect_Person_UPDATE BEFORE UPDATE ON "Person" BEGIN SELECT RAISE(ABORT, 'Read-only evidence-derived entity'); END;
CREATE TRIGGER protect_Person_DELETE BEFORE DELETE ON "Person" BEGIN SELECT RAISE(ABORT, 'Read-only evidence-derived entity'); END;
CREATE TRIGGER protect_GoLiveCondition_UPDATE BEFORE UPDATE ON "GoLiveCondition" BEGIN SELECT RAISE(ABORT, 'Read-only evidence-derived entity'); END;
CREATE TRIGGER protect_GoLiveCondition_DELETE BEFORE DELETE ON "GoLiveCondition" BEGIN SELECT RAISE(ABORT, 'Read-only evidence-derived entity'); END;
CREATE TRIGGER protect_FactEvidence_UPDATE BEFORE UPDATE ON "FactEvidence" BEGIN SELECT RAISE(ABORT, 'Read-only evidence-derived entity'); END;
CREATE TRIGGER protect_FactEvidence_DELETE BEFORE DELETE ON "FactEvidence" BEGIN SELECT RAISE(ABORT, 'Read-only evidence-derived entity'); END;
CREATE TRIGGER protect_official_UPDATE BEFORE UPDATE ON Question WHEN OLD.isOfficial = 1 BEGIN SELECT RAISE(ABORT, 'Official question is protected'); END;
CREATE TRIGGER protect_official_DELETE BEFORE DELETE ON Question WHEN OLD.isOfficial = 1 BEGIN SELECT RAISE(ABORT, 'Official question is protected'); END;
CREATE TRIGGER protect_QuestionEvidence_UPDATE BEFORE UPDATE ON "QuestionEvidence" WHEN EXISTS (SELECT 1 FROM Question WHERE id=OLD.questionId AND isOfficial=1) BEGIN SELECT RAISE(ABORT, 'Official evidence relationship is protected'); END;
CREATE TRIGGER protect_QuestionEvidence_DELETE BEFORE DELETE ON "QuestionEvidence" WHEN EXISTS (SELECT 1 FROM Question WHERE id=OLD.questionId AND isOfficial=1) BEGIN SELECT RAISE(ABORT, 'Official evidence relationship is protected'); END;
CREATE TRIGGER protect_QuestionFact_UPDATE BEFORE UPDATE ON "QuestionFact" WHEN EXISTS (SELECT 1 FROM Question WHERE id=OLD.questionId AND isOfficial=1) BEGIN SELECT RAISE(ABORT, 'Official evidence relationship is protected'); END;
CREATE TRIGGER protect_QuestionFact_DELETE BEFORE DELETE ON "QuestionFact" WHEN EXISTS (SELECT 1 FROM Question WHERE id=OLD.questionId AND isOfficial=1) BEGIN SELECT RAISE(ABORT, 'Official evidence relationship is protected'); END;
CREATE TRIGGER protect_event_UPDATE BEFORE UPDATE ON ImpactEvent BEGIN SELECT RAISE(ABORT, 'Append-only impact event'); END;
CREATE TRIGGER protect_event_DELETE BEFORE DELETE ON ImpactEvent BEGIN SELECT RAISE(ABORT, 'Append-only impact event'); END;
