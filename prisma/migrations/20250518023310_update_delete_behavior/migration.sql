-- DropForeignKey
ALTER TABLE "detalleventas" DROP CONSTRAINT "detalleventas_productoid_fkey";

-- DropForeignKey
ALTER TABLE "detalleventas" DROP CONSTRAINT "detalleventas_ventaid_fkey";

-- AddForeignKey
ALTER TABLE "detalleventas" ADD CONSTRAINT "detalleventas_productoid_fkey" FOREIGN KEY ("productoid") REFERENCES "productos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalleventas" ADD CONSTRAINT "detalleventas_ventaid_fkey" FOREIGN KEY ("ventaid") REFERENCES "ventas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
