/*
  Warnings:

  - Added the required column `password` to the `employee_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employee_info" ADD COLUMN     "password" VARCHAR(125) NOT NULL;
