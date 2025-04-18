import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs}'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	{
		files: ['**/*.{js,mjs,cjs}'],
		plugins: {
			js,
		},
		extends: ['js/recommended'],
	},
	{
		extends: ['eslint:recommended', 'plugin:prettier/recommended'],
		plugins: ['prettier'],
	},
]);
