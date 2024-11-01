import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { type NextAuthOptions } from "next-auth";

const prisma = new PrismaClient();

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          return null;
        }

        const isPasswordCorrect = await compare(
          credentials.password,
          user.password
        );

        if (isPasswordCorrect) {
          return { id: JSON.stringify(user.id), email: user.email };
        }

        console.log("Incorrect password");

        return null;
      },
    }),
  ],
};
