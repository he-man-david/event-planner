-- CreateTable
CREATE TABLE "Event" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "eventStart" TIMESTAMP(3) NOT NULL,
    "eventEnd" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eventOptionId" UUID,
    "planned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventOption" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT,
    "linkPreview" JSONB NOT NULL,
    "eventId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventOptionVote" (
    "eventOptionId" UUID NOT NULL,
    "eventMemberId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventOptionVote_pkey" PRIMARY KEY ("eventOptionId","eventMemberId")
);

-- CreateTable
CREATE TABLE "EventComment" (
    "eventId" UUID NOT NULL,
    "createdBy" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventComment_pkey" PRIMARY KEY ("createdAt","eventId")
);

-- CreateTable
CREATE TABLE "EventMember" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "eventId" UUID NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Event_updatedAt_eventStart_idx" ON "Event"("updatedAt" DESC, "eventStart" DESC);

-- CreateIndex
CREATE INDEX "EventOption_eventId_updatedAt_idx" ON "EventOption"("eventId", "updatedAt" DESC);

-- CreateIndex
CREATE INDEX "EventOption_updatedAt_idx" ON "EventOption"("updatedAt" DESC);

-- CreateIndex
CREATE INDEX "EventOptionVote_updatedAt_idx" ON "EventOptionVote"("updatedAt" DESC);

-- CreateIndex
CREATE INDEX "EventComment_updatedAt_idx" ON "EventComment"("updatedAt" DESC);

-- CreateIndex
CREATE INDEX "EventMember_eventId_userId_updatedAt_idx" ON "EventMember"("eventId", "userId", "updatedAt" DESC);

-- AddForeignKey
ALTER TABLE "EventOption" ADD CONSTRAINT "EventOption_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventOptionVote" ADD CONSTRAINT "EventOptionVote_eventMemberId_fkey" FOREIGN KEY ("eventMemberId") REFERENCES "EventMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventOptionVote" ADD CONSTRAINT "EventOptionVote_eventOptionId_fkey" FOREIGN KEY ("eventOptionId") REFERENCES "EventOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventMember" ADD CONSTRAINT "EventMember_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
