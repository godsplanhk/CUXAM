-- CreateEnum
CREATE TYPE "user_type" AS ENUM ('superadmin', 'admin', 'user');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "user_type" NOT NULL DEFAULT 'user';
