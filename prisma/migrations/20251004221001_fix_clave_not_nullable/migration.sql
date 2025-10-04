/*
  Warnings:

  - Made the column `clave` on table `configuracion` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "configuracion" ALTER COLUMN "clave" SET NOT NULL;
