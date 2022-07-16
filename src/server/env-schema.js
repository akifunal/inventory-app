const { z } = require('zod');

/*eslint sort-keys: "error"*/
const envSchema = z.object({
	DATABASE_URL: z.string().url(),
	GITHUB_ID: z.string(),
	GITHUB_SECRET: z.string(),
	NEXTAUTH_SECRET: z.string(),
	NEXTAUTH_URL: z.string().url(),
	NODE_ENV: z.enum(['development', 'test', 'production']),
});

module.exports.envSchema = envSchema;
