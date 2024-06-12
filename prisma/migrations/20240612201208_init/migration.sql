-- CreateEnum
CREATE TYPE "EmployeePosition" AS ENUM ('FRONT_DESK', 'TEACHER', 'MANAGEMENT');

-- CreateEnum
CREATE TYPE "EmployeeRole" AS ENUM ('ADMIN', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "EmployeeStatus" AS ENUM ('IN_EXPERIENCE', 'HIRED', 'FIRED');

-- CreateTable
CREATE TABLE "employee_data" (
    "id" UUID NOT NULL,
    "alma_id" UUID NOT NULL,
    "first_name" VARCHAR(125) NOT NULL,
    "last_name" VARCHAR(125) NOT NULL,
    "username" VARCHAR(45) NOT NULL,
    "email" VARCHAR(250) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "position" "EmployeePosition" NOT NULL,
    "role" "EmployeeRole" NOT NULL,
    "status" "EmployeeStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employee_data_id_key" ON "employee_data"("id");

-- CreateIndex
CREATE UNIQUE INDEX "employee_data_alma_id_key" ON "employee_data"("alma_id");

-- CreateIndex
CREATE UNIQUE INDEX "employee_data_email_key" ON "employee_data"("email");

-- CreateIndex
CREATE UNIQUE INDEX "employee_data_phone_key" ON "employee_data"("phone");
