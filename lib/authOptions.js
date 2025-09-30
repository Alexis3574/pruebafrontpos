// lib/authOptions.js
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async authorize(credentials) {
      const user = await prisma.usuarios.findUnique({
        where: { email: credentials.email },
      });

      if (user && (await compare(credentials.password, user.password))) {
        return user;
      }

      throw new Error("Correo o contraseña inválidos");
    },
    async session({ session, token }) {
      if (token?.sub) session.user.id = token.sub;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
  },
};
