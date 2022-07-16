import { createNextApiHandler } from '@trpc/server/adapters/next';

import { appRouter } from '@router';
import { createContext } from '@router/trpc/context';

// export API handler
export default createNextApiHandler({
	router: appRouter,
	createContext: createContext,
});
