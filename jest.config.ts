import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig: Config = {
	roots: ['<rootDir>/src'],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	moduleDirectories: ['node_modules', '<rootDir>/'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'^@api/(.*)$': '<rootDir>/src/pages/api/$1',
		'^@db/(.*)$': '<rootDir>/src/server/db/$1',
		'^@routers$': '<rootDir>/src/server/routers',
		'^@routers/(.*)$': '<rootDir>/src/server/routers/$1',
		'^@utils$': '<rootDir>/src/utils',
		'^@utils/(.*)$': '<rootDir>/src/utils/$1',
	},
	testEnvironment: 'jest-environment-jsdom',
	clearMocks: true,
	collectCoverage: true,
	collectCoverageFrom: [
		'<rootDir>/src/components/**/*.{js,jsx,ts,tsx}',
		'<rootDir>/src/server/router/{subroutes,utils}/**/*.{js,jsx,ts,tsx}',
		'<rootDir>/src/server/schema/**/*.{js,ts}',
		'<rootDir>/src/utils/helpers/**/*.{js,ts}',
		'!**/*.d.ts',
		'!<rootDir>/src/server/**/index.{js,ts}',
	],
	coverageThreshold: {
		global: {
			branches: 60,
			functions: 58,
			lines: 75,
			statements: 78,
		},
	},
};

export default createJestConfig(customJestConfig);
