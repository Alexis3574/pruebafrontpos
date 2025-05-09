// /app/api/users/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request) {
  const data = await request.json();
  const newUser = await prisma.user.create({ data });
  return NextResponse.json(newUser);
}

export async function PUT(request) {
  const data = await request.json();
  const updatedUser = await prisma.user.update({
    where: { id: data.id },
    data,
  });
  return NextResponse.json(updatedUser);
}

export async function DELETE(request) {
  const { id } = await request.json();
  const deletedUser = await prisma.user.delete({ where: { id } });
  return NextResponse.json(deletedUser);
}

// Repite la misma estructura para ventas, productos, inventario, proveedores, reportes, facturacion, configuracion, perfil:

// /app/api/products/route.js
// /app/api/sales/route.js
// /app/api/inventory/route.js
// /app/api/providers/route.js
// /app/api/reports/route.js
// /app/api/invoices/route.js
// /app/api/settings/route.js
// /app/api/profile/route.js

// Cada archivo contiene:
/*
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.entity.findMany();
  return NextResponse.json(data);
}

export async function POST(request) {
  const data = await request.json();
  const newRecord = await prisma.entity.create({ data });
  return NextResponse.json(newRecord);
}

export async function PUT(request) {
  const data = await request.json();
  const updatedRecord = await prisma.entity.update({
    where: { id: data.id },
    data,
  });
  return NextResponse.json(updatedRecord);
}

export async function DELETE(request) {
  const { id } = await request.json();
  const deletedRecord = await prisma.entity.delete({ where: { id } });
  return NextResponse.json(deletedRecord);
}
*/

// Reemplaza 'entity' por el nombre de la entidad correspondiente en cada archivo.

// Además, asegúrate de tener en tu archivo schema.prisma los modelos bien definidos y ejecuta:
// npx prisma generate
// npx prisma migrate dev --name init

// Para conexión a la base de datos PostgreSQL, asegúrate de tener en .env:
// DATABASE_URL="postgresql://user:password@localhost:5432/tu_basededatos"
