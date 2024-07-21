/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			lineHeight: {
				relaxed: '1.75',
			},
			fontSize: {
				xs: ['0.75rem', null],
				sm: ['0.875rem', null],
				base: ['1rem', null],
				lg: ['1.125rem', null],
				xl: ['1.25rem', null],
				'2xl': ['1.5rem', null],
				'3xl': ['1.875rem', null],
				'4xl': ['2.25rem', null],
				'5xl': ['3rem', null],
				'6xl': ['3.75rem', null],
				'7xl': ['4.5rem', null],
				'8xl': ['6rem', null],
				'9xl': ['8rem', null],
      },
			fontFamily: {
				sans: [
					'-apple-system','"Noto Sans JP"','"Hiragino Kaku Gothic ProN"','"Hiragino Sans"','Meiryo','sans-serif'
				],
				"zen-maru": [
					"Zen Maru Gothic", "san-serif"
				],
			},
			// colors: {
			// 	"tcg": {
			// 		"light-blue": "#51c7ee",
			// 		"blue": "#197fbf",
			// 		"light-pink": "#fcf2f7",
			// 		"pink": "#e57cab",
			// 		"black": "#1a1a1a",
			// 		"DEFAULT": "#197fbf",
			// 	}
			// },
			boxShadow: {
				sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
				DEFAULT: '0 0 4px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
				md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
				lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
				xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
				'2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
				inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
				none: 'none',
			},
			screens: {
				'xs': '480px'
			}
		},
	},
	plugins: [
		plugin(function ({ addVariant, addUtilities, addComponents, e, prefix, config }) {
			addVariant(
        "hover",
        "@media(hover:hover){ &:where(:any-link, :enabled, summary):hover }"
      );
			const newUtilities = {
				".counter-annotation-reset": {
					counterReset: "annotation 0"
				},
				".counter-annotation-increment": {
					counterIncrement: "annotation",
				},
				".content-annotation-count": {
					position: "absolute",
					left: "0",
					content: '"※" counter(annotation)',
					color: "currentColor"
				},
				".content-annotation": {
					position: "absolute",
					left: "0",
					content: '"※"',
					color: "currentColor"
				},
				".text-shadow": {
          textShadow: "2px 2px black"
				},
      };
			addUtilities(newUtilities);
		}),
	],
}
/* 
config.full.js
https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js
*/