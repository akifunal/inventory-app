import { t } from '../trpc';

export const authRouter = t.router({
	getSession: t.procedure.query(async ({ ctx }) => {
		return ctx.session;
	}),
	getSecretMessage: t.procedure.query(async ({ ctx }) => {
		return 'You are logged in and can see this secret message!';
	}),
});
