-- CreateEnum
CREATE TYPE "EmployeeRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "EmployeeStatus" AS ENUM ('IN_EXPERIENCE', 'HIRED', 'FIRED');

-- CreateEnum
CREATE TYPE "ProposalStatus" AS ENUM ('UNDER_ANALYSIS', 'ON_VOTE', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "VotingResult" AS ENUM ('APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "employee_info" (
    "id" UUID NOT NULL,
    "first_name" VARCHAR(125) NOT NULL,
    "last_name" VARCHAR(125) NOT NULL,
    "username" VARCHAR(45) NOT NULL,
    "email" VARCHAR(250) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "position" VARCHAR(125) NOT NULL,
    "role" "EmployeeRole" NOT NULL,
    "status" "EmployeeStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proposal" (
    "id" UUID NOT NULL,
    "employee_id" UUID NOT NULL,
    "proposal" VARCHAR(125) NOT NULL,
    "description" VARCHAR(700) NOT NULL,
    "status" "ProposalStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "proposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proposal_hype" (
    "id" UUID NOT NULL,
    "proposal_id" UUID NOT NULL,
    "employee_id" UUID NOT NULL,
    "comment" VARCHAR(280) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "proposal_hype_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proposal_voting" (
    "id" UUID NOT NULL,
    "proposal_id" UUID NOT NULL,
    "expires_in" VARCHAR NOT NULL,
    "in_favour" INTEGER NOT NULL,
    "against" INTEGER NOT NULL,
    "result" "VotingResult" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "proposal_voting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_vote" (
    "id" UUID NOT NULL,
    "proposal_id" UUID NOT NULL,
    "employee_id" UUID NOT NULL,
    "voted" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_vote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "proposal" ADD CONSTRAINT "proposal_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposal_hype" ADD CONSTRAINT "proposal_hype_proposal_id_fkey" FOREIGN KEY ("proposal_id") REFERENCES "proposal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposal_hype" ADD CONSTRAINT "proposal_hype_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposal_voting" ADD CONSTRAINT "proposal_voting_proposal_id_fkey" FOREIGN KEY ("proposal_id") REFERENCES "proposal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_vote" ADD CONSTRAINT "employee_vote_proposal_id_fkey" FOREIGN KEY ("proposal_id") REFERENCES "proposal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_vote" ADD CONSTRAINT "employee_vote_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
