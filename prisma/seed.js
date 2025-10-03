import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {

  await prisma.configuracion.upsert({
    where: { clave: "escala_grises" }, 
    update: {}, 
    create: {
      clave: "escala_grises",
      valor: "false",
    },
  });

  console.log(" Configuración escala_grises asegurada en la base de datos");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
