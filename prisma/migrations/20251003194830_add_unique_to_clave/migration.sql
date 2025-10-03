/*
  Warnings:

  - A unique constraint covering the columns `[clave]` on the table `configuracion` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "configuracion_clave_key" ON "configuracion"("clave");
