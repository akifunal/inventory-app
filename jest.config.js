const nextJest = require('next/jest');

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
	roots: ['<rootDir>/src'],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	moduleDirectories: ['node_modules', '<rootDir>/'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'^@api/(.*)$': '<rootDir>/src/pages/api/$1',
		'^@db/(.*)$': '<rootDir>/src/server/db/$1',
		'^@router$': '<rootDir>/src/server/router',
		'^@router/(.*)$': '<rootDir>/src/server/router/$1',
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
			branches: 65,
			functions: 58,
			lines: 75,
			statements: 78,
		},
	},
};

module.exports = createJestConfig(customJestConfig);
