/*
  Warnings:

  - You are about to alter the column `total` on the `facturas` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Decimal(14,2)`.
  - A unique constraint covering the columns `[folio]` on the table `facturas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clienteNombre` to the `facturas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `negocioNombre` to the `facturas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `facturas` table without a default value. This is not possible if the table is not empty.
  - Made the column `total` on table `facturas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fecha` on table `facturas` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "facturas" ADD COLUMN     "clienteCp" VARCHAR(5),
ADD COLUMN     "clienteDir" VARCHAR(250),
ADD COLUMN     "clienteEmail" VARCHAR(120),
ADD COLUMN     "clienteNombre" VARCHAR(150) NOT NULL,
ADD COLUMN     "clienteRfc" VARCHAR(13),
ADD COLUMN     "clienteTel" VARCHAR(20),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "descuentos" DECIMAL(14,2) NOT NULL DEFAULT 0,
ADD COLUMN     "formaPago" VARCHAR(10) NOT NULL DEFAULT 'PUE',
ADD COLUMN     "iva" DECIMAL(14,2) NOT NULL DEFAULT 0,
ADD COLUMN     "metodoPago" VARCHAR(4) NOT NULL DEFAULT '99',
ADD COLUMN     "moneda" VARCHAR(10) NOT NULL DEFAULT 'MXN',
ADD COLUMN     "negocioDir" VARCHAR(250),
ADD COLUMN     "negocioEmail" VARCHAR(120),
ADD COLUMN     "negocioNombre" VARCHAR(150) NOT NULL,
ADD COLUMN     "negocioRfc" VARCHAR(13),
ADD COLUMN     "negocioTel" VARCHAR(20),
ADD COLUMN     "observaciones" TEXT,
ADD COLUMN     "serie" VARCHAR(10),
ADD COLUMN     "subtotal" DECIMAL(14,2) NOT NULL DEFAULT 0,
ADD COLUMN     "tasaIvaGlobal" DECIMAL(5,2) NOT NULL DEFAULT 16.00,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "usoCfdi" VARCHAR(4) NOT NULL DEFAULT 'P01',
ALTER COLUMN "total" SET NOT NULL,
ALTER COLUMN "total" SET DEFAULT 0,
ALTER COLUMN "total" SET DATA TYPE DECIMAL(14,2),
ALTER COLUMN "fecha" SET NOT NULL,
ALTER COLUMN "fecha" SET DATA TYPE TIMESTAMP(3);

-- CreateTable
CREATE TABLE "factura_items" (
    "id" SERIAL NOT NULL,
    "facturaId" INTEGER NOT NULL,
    "descripcion" VARCHAR(250) NOT NULL,
    "cantidad" DECIMAL(14,4) NOT NULL,
    "precio" DECIMAL(14,4) NOT NULL,
    "descuento" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "iva" DECIMAL(5,2) NOT NULL DEFAULT 16,
    "importe" DECIMAL(14,2) NOT NULL,

    CONSTRAINT "factura_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "factura_items_facturaId_idx" ON "factura_items"("facturaId");

-- CreateIndex
CREATE UNIQUE INDEX "facturas_folio_key" ON "facturas"("folio");

-- CreateIndex
CREATE INDEX "facturas_fecha_idx" ON "facturas"("fecha");

-- CreateIndex
CREATE INDEX "facturas_ventaid_idx" ON "facturas"("ventaid");

-- AddForeignKey
ALTER TABLE "factura_items" ADD CONSTRAINT "factura_items_facturaId_fkey" FOREIGN KEY ("facturaId") REFERENCES "facturas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
