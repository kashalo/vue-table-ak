import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from 'rollup-plugin-buble'; // Transpile/polyfill with reasonable browser support
import commonjs from 'rollup-plugin-commonjs';
import {
	terser
} from "rollup-plugin-terser"; // Compress JS file
import builtins from '@joseph184/rollup-plugin-node-builtins';

export default {
	input: './src/wrapper.js',
	output: {
		name: 'InteractiveTable',
		exports: 'named',
		globals: {
			'moment': 'moment',
			'vue-paginator-ak': 'vue-paginator-ak',
			'vue': 'vue',
		},
	},

	plugins: [
		vue({
			css: true, // Dynamically inject css as a <style> tag
			compileTemplate: true, // Explicitly convert template to render function
		}),
		buble(), // Transpile to ES5
		commonjs(),
		terser(),
		builtins()
	],
	external: ['moment', 'vue-paginator-ak', 'vue']
};