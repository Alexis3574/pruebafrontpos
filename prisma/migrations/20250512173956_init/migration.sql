-- CreateTable
CREATE TABLE "configuracion" (
    "id" SERIAL NOT NULL,
    "clave" VARCHAR(100),
    "valor" TEXT,

    CONSTRAINT "configuracion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalleventas" (
    "id" SERIAL NOT NULL,
    "ventaid" INTEGER,
    "productoid" INTEGER,
    "cantidad" INTEGER,
    "preciounitario" DECIMAL,

    CONSTRAINT "detalleventas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facturas" (
    "id" SERIAL NOT NULL,
    "ventaid" INTEGER,
    "folio" VARCHAR(50),
    "total" DECIMAL,
    "fecha" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "facturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movimientosinventario" (
    "id" SERIAL NOT NULL,
    "productoid" INTEGER,
    "tipo" VARCHAR(50),
    "cantidad" INTEGER,
    "observacion" TEXT,
    "fecha" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "movimientosinventario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productos" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100),
    "tipo" VARCHAR(50),
    "preciocompra" DECIMAL,
    "precioventa" DECIMAL,
    "stock" INTEGER,
    "stockminimo" INTEGER DEFAULT 5,
    "fechacaducidad" DATE,
    "creadoen" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "unidadMedida" VARCHAR(20),

    CONSTRAINT "productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proveedores" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100),
    "contacto" VARCHAR(100),
    "productos" TEXT,

    CONSTRAINT "proveedores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reportes" (
    "id" SERIAL NOT NULL,
    "tipo" VARCHAR(100),
    "generadopor" INTEGER,
    "fecha" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "datos" JSONB,

    CONSTRAINT "reportes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100),
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "rol" VARCHAR(50) DEFAULT 'usuario',
    "creadoen" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ventas" (
    "id" SERIAL NOT NULL,
    "usuarioid" INTEGER,
    "fecha" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "total" DECIMAL,
    "metodopago" VARCHAR(50),

    CONSTRAINT "ventas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "configuracion_clave_key" ON "configuracion"("clave");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "detalleventas" ADD CONSTRAINT "detalleventas_productoid_fkey" FOREIGN KEY ("productoid") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detalleventas" ADD CONSTRAINT "detalleventas_ventaid_fkey" FOREIGN KEY ("ventaid") REFERENCES "ventas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "facturas" ADD CONSTRAINT "facturas_ventaid_fkey" FOREIGN KEY ("ventaid") REFERENCES "ventas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "movimientosinventario" ADD CONSTRAINT "movimientosinventario_productoid_fkey" FOREIGN KEY ("productoid") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reportes" ADD CONSTRAINT "reportes_generadopor_fkey" FOREIGN KEY ("generadopor") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_usuarioid_fkey" FOREIGN KEY ("usuarioid") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
