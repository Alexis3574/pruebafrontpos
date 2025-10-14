/*
  Warnings:

  - A unique constraint covering the columns `[clave,usuarioid]` on the table `configuracion` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."configuracion_clave_key";

-- AlterTable
ALTER TABLE "configuracion" ADD COLUMN     "usuarioid" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "configuracion_clave_usuarioid_key" ON "configuracion"("clave", "usuarioid");

-- AddForeignKey
ALTER TABLE "configuracion" ADD CONSTRAINT "configuracion_usuarioid_fkey" FOREIGN KEY ("usuarioid") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
