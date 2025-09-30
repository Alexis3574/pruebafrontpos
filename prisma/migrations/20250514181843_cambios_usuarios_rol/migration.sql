/*
  Warnings:

  - You are about to drop the column `email` on the `usuarios` table. All the data in the column will be lost.
  - The `rol` column on the `usuarios` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('administrador', 'usuario');

-- DropIndex
DROP INDEX "usuarios_email_key";

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "email",
DROP COLUMN "rol",
ADD COLUMN     "rol" "Rol" NOT NULL DEFAULT 'usuario';
