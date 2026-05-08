import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user }) {
      const allowedEmail = "ilhammhafidzz@gmail.com";

      if (user.email !== allowedEmail) {
        return "/login?error=AccessDenied";
      }

      return true;
    },

    async jwt({ token, account }) {
      if (account) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: account.id_token,
              }),
            }
          );

          const data = await res.json();

          if (res.ok && data.token) {
            token.accessToken = data.token;
          } else {
            console.error(
              "Backend Go menolak token Google:",
              data.message
            );
          }
        } catch (error) {
          console.error(
            "Gagal koneksi ke API Go saat menukar token:",
            error
          );
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };