/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `employee_info` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `employee_info` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `employee_info` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `proposal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[proposal_id]` on the table `proposal_voting` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `expires_in` on the `proposal_voting` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "proposal_voting" DROP COLUMN "expires_in",
ADD COLUMN     "expires_in" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "employee_info_id_key" ON "employee_info"("id");

-- CreateIndex
CREATE UNIQUE INDEX "employee_info_email_key" ON "employee_info"("email");

-- CreateIndex
CREATE UNIQUE INDEX "employee_info_phone_key" ON "employee_info"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "proposal_id_key" ON "proposal"("id");

-- CreateIndex
CREATE UNIQUE INDEX "proposal_voting_proposal_id_key" ON "proposal_voting"("proposal_id");
