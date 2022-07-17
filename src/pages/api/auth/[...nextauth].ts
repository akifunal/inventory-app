import NextAuth, { type NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import TwitchProvider from 'next-auth/providers/twitch';

// Prisma adapter for NextAuth, optional and can be removed
import { prisma } from '@db/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { env } from '../../../server/env';

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	adapter: PrismaAdapter(prisma),
	providers: [
		GithubProvider({
			clientId: env.GITHUB_ID,
			clientSecret: env.GITHUB_SECRET,
		}),
		TwitchProvider({
			clientId: env.TWITCH_CLIENT_ID,
			clientSecret: env.TWITCH_CLIENT_SECRET,
		}),
	],
};

export default NextAuth(authOptions);
