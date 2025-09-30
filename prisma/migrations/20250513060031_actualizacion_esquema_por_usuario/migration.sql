/*
  Warnings:

  - You are about to drop the column `generadopor` on the `reportes` table. All the data in the column will be lost.
  - Added the required column `usuarioid` to the `configuracion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioid` to the `movimientosinventario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioid` to the `productos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioid` to the `proveedores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioid` to the `reportes` table without a default value. This is not possible if the table is not empty.
  - Made the column `usuarioid` on table `ventas` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "detalleventas" DROP CONSTRAINT "detalleventas_productoid_fkey";

-- DropForeignKey
ALTER TABLE "detalleventas" DROP CONSTRAINT "detalleventas_ventaid_fkey";

-- DropForeignKey
ALTER TABLE "facturas" DROP CONSTRAINT "facturas_ventaid_fkey";

-- DropForeignKey
ALTER TABLE "movimientosinventario" DROP CONSTRAINT "movimientosinventario_productoid_fkey";

-- DropForeignKey
ALTER TABLE "reportes" DROP CONSTRAINT "reportes_generadopor_fkey";

-- DropForeignKey
ALTER TABLE "ventas" DROP CONSTRAINT "ventas_usuarioid_fkey";

-- DropIndex
DROP INDEX "configuracion_clave_key";

-- AlterTable
ALTER TABLE "configuracion" ADD COLUMN     "usuarioid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "movimientosinventario" ADD COLUMN     "usuarioid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "productos" ADD COLUMN     "usuarioid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "proveedores" ADD COLUMN     "usuarioid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "reportes" DROP COLUMN "generadopor",
ADD COLUMN     "usuarioid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ventas" ALTER COLUMN "usuarioid" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "configuracion" ADD CONSTRAINT "configuracion_usuarioid_fkey" FOREIGN KEY ("usuarioid") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_usuarioid_fkey" FOREIGN KEY ("usuarioid") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proveedores" ADD CONSTRAINT "proveedores_usuarioid_fkey" FOREIGN KEY ("usuarioid") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_usuarioid_fkey" FOREIGN KEY ("usuarioid") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalleventas" ADD CONSTRAINT "detalleventas_productoid_fkey" FOREIGN KEY ("productoid") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalleventas" ADD CONSTRAINT "detalleventas_ventaid_fkey" FOREIGN KEY ("ventaid") REFERENCES "ventas"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "facturas" ADD CONSTRAINT "facturas_ventaid_fkey" FOREIGN KEY ("ventaid") REFERENCES "ventas"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimientosinventario" ADD CONSTRAINT "movimientosinventario_usuarioid_fkey" FOREIGN KEY ("usuarioid") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimientosinventario" ADD CONSTRAINT "movimientosinventario_productoid_fkey" FOREIGN KEY ("productoid") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reportes" ADD CONSTRAINT "reportes_usuarioid_fkey" FOREIGN KEY ("usuarioid") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
