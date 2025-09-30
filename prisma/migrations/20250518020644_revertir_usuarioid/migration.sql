/*
  Warnings:

  - You are about to drop the column `usuarioid` on the `configuracion` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioid` on the `movimientosinventario` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioid` on the `productos` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioid` on the `proveedores` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioid` on the `reportes` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioid` on the `ventas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "configuracion" DROP CONSTRAINT "configuracion_usuarioid_fkey";

-- DropForeignKey
ALTER TABLE "movimientosinventario" DROP CONSTRAINT "movimientosinventario_usuarioid_fkey";

-- DropForeignKey
ALTER TABLE "productos" DROP CONSTRAINT "productos_usuarioid_fkey";

-- DropForeignKey
ALTER TABLE "proveedores" DROP CONSTRAINT "proveedores_usuarioid_fkey";

-- DropForeignKey
ALTER TABLE "reportes" DROP CONSTRAINT "reportes_usuarioid_fkey";

-- DropForeignKey
ALTER TABLE "ventas" DROP CONSTRAINT "ventas_usuarioid_fkey";

-- AlterTable
ALTER TABLE "configuracion" DROP COLUMN "usuarioid";

-- AlterTable
ALTER TABLE "movimientosinventario" DROP COLUMN "usuarioid";

-- AlterTable
ALTER TABLE "productos" DROP COLUMN "usuarioid";

-- AlterTable
ALTER TABLE "proveedores" DROP COLUMN "usuarioid";

-- AlterTable
ALTER TABLE "reportes" DROP COLUMN "usuarioid";

-- AlterTable
ALTER TABLE "ventas" DROP COLUMN "usuarioid";
