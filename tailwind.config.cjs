const colors = require('tailwindcss/colors');
// const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './src/**/*.{html,svelte}', 
    './node_modules/svelte-ux/**/*.{svelte,js}', 
    './node_modules/layerchart/**/*.{svelte,js}'
  ],
  theme: {
    extend: {
			screens: {
				mobile: '480px',
				tablet: '960px',
				desktop: '1248px',
				wide: '1500px'
			},
			colors: {
				accent: colors.green,
				secondary: colors.purple,
				tertiary: colors.orange,
				blue: colors.blue,
				usfGreen: '#006747',
				usfGold: '#CFC493',
				usfWhite: '#FFFFFF',
				secSand: '#EDEBD1',
				secEvergreen: '#005432',
				accLemongrass: '#DBE442',
				accApple: '#9CCB3B',
				accTeal: '#009374',
				accSeaglass: '#80B0A6',
				accStorm: '#006484',
				accSilver: '#CAD2D8',
				accGray: '#7E96A0',
				accSlate: '#293a40',
				clay: '#C03F1F'
			}
		}
  },
  variants: {
    extend: {},
  },
  plugins: [require('svelte-ux/plugins/tailwind.cjs')],
};