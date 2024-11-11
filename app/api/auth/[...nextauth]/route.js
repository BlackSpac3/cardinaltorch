import userModel from "@lib/models/userModel";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import connectDB from "@lib/config/db";
import formatUserData from "@lib/helpers/formatUserData";
import { NextResponse } from "next/server";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectDB();
          let user = await userModel.findOne({
            "personal_info.email": email,
            disabled: false,
          });

          if (!user) {
            return null;
          }

          const isMatch = await bcrypt.compare(
            password,
            user.personal_info.password
          );
          if (!isMatch) {
            return null;
          }

          user = formatUserData(user);
          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: token,
      };
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET_ACCESS_KEY,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
