const { PrismaClient, Rol } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  const nombre = 'Administrador'
  const usuario = 'admin'
  const password = 'admin123'   // contraseña inicial
  const rol = Rol.administrador // usamos el enum tal cual lo definiste

  // Hashear contraseña
  const hashedPassword = await bcrypt.hash(password, 10)

  // Crear o actualizar admin
  const admin = await prisma.usuarios.upsert({
    where: { usuario }, // campo único
    update: {},
    create: {
      nombre,
      usuario,
      password: hashedPassword,
      rol,
    },
  })

  console.log('✅ Usuario administrador creado:')
  console.log(`   Usuario: ${admin.usuario}`)
  console.log(`   Contraseña: ${password} (recuerda que se guarda encriptada)`)
}

main()
  .catch((e) => {
    console.error('❌ Error creando admin:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
