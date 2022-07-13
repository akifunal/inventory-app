module.exports = {
	// Type check all TS files
	'**/*.(ts|tsx)': () => 'tsc -p tsconfig.json --noEmit',

	// Lint & Format & Test TS and JS files
	'*.(ts|tsx|js|jsx)': [
		'eslint --fix',
		'prettier --write',
		'yarn test:staged',
	],

	// Format MarkDown and JSON files
	'*.(md|json)': ['prettier --write'],
};
