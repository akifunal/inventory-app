import { getBaseUrl } from '@/utils/helpers';

/**
 * If you want to use SSR, you need to use the server's full URL
 * @link https://trpc.io/docs/ssr
 */
export const url = `${getBaseUrl()}/api/trpc`;
