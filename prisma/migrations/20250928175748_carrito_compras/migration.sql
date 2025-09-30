-- CreateTable
CREATE TABLE "Carrito" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT NOT NULL DEFAULT 'pendiente',

    CONSTRAINT "Carrito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarritoItem" (
    "id" SERIAL NOT NULL,
    "carritoId" INTEGER NOT NULL,
    "productoId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CarritoItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Carrito" ADD CONSTRAINT "Carrito_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarritoItem" ADD CONSTRAINT "CarritoItem_carritoId_fkey" FOREIGN KEY ("carritoId") REFERENCES "Carrito"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarritoItem" ADD CONSTRAINT "CarritoItem_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
