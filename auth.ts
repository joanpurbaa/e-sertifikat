import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";

export const { auth, handlers, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/login",
	},
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials): Promise<any> => {
				let user = null;

				user = await prisma.user.findUnique({
					where: {
						email: credentials?.email,
					},
				});

				if (!user) return null;

				const comparePassword = await bcrypt.compare(
					credentials?.password as string,
					user?.password as string
				);

				if (!comparePassword) return null;

				return user;
			},
		}),
	],
	callbacks: {
		authorized({ request: { nextUrl }, auth }) {
			const isLoggedIn = !!auth?.user;
			const { pathname } = nextUrl;

			if (pathname.startsWith("/") && isLoggedIn) {
				return Response.redirect(new URL("/", nextUrl));
			}

			if (pathname.startsWith("/login") && !isLoggedIn) {
				return Response.redirect(new URL("/login", nextUrl));
			}
		},
	},
});
