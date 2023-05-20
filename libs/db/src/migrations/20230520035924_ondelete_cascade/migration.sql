-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "EventComment" DROP CONSTRAINT "EventComment_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "EventMember" DROP CONSTRAINT "EventMember_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventMember" DROP CONSTRAINT "EventMember_userId_fkey";

-- DropForeignKey
ALTER TABLE "EventOption" DROP CONSTRAINT "EventOption_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventOptionVote" DROP CONSTRAINT "EventOptionVote_eventOptionId_fkey";

-- DropForeignKey
ALTER TABLE "EventOptionVote" DROP CONSTRAINT "EventOptionVote_userId_fkey";

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventOption" ADD CONSTRAINT "EventOption_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventOptionVote" ADD CONSTRAINT "EventOptionVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventOptionVote" ADD CONSTRAINT "EventOptionVote_eventOptionId_fkey" FOREIGN KEY ("eventOptionId") REFERENCES "EventOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventComment" ADD CONSTRAINT "EventComment_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventMember" ADD CONSTRAINT "EventMember_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventMember" ADD CONSTRAINT "EventMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
