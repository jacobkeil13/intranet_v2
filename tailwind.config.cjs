const colors = require('tailwindcss/colors');
// const plugin = require('tailwindcss/plugin');

module.exports = {
	// ux: {
	// 	themes: {
	// 		"light": {
	// 			"primary-content": "rgb(0 0 0)",
	// 			"secondary-content": "rgb(0 0 0)",
	// 			"accent-content": "rgb(255 255 255)",
	// 			"success-content": "rgb(0 0 0)",
	// 			"warning-content": "rgb(0 0 0)",
	// 			"danger-content": "rgb(255 255 255)",
	// 			"surface-content": "rgb(0 0 0)",
	// 			"primary-100": "rgb(219 234 254)",
	// 			"primary-200": "rgb(191 219 254)",
	// 			"primary-300": "rgb(147 197 253)",
	// 			"primary-400": "rgb(96 165 250)",
	// 			"primary-500": "rgb(59 130 246)",
	// 			"primary-600": "rgb(37 99 235)",
	// 			"primary-700": "rgb(29 78 216)",
	// 			"primary-800": "rgb(30 64 175)",
	// 			"primary-900": "rgb(30 58 138)",
	// 			"secondary-100": "rgb(224 242 254)",
	// 			"secondary-200": "rgb(186 230 253)",
	// 			"secondary-300": "rgb(125 211 252)",
	// 			"secondary-400": "rgb(56 189 248)",
	// 			"secondary-500": "rgb(14 165 233)",
	// 			"secondary-600": "rgb(2 132 199)",
	// 			"secondary-700": "rgb(3 105 161)",
	// 			"secondary-800": "rgb(7 89 133)",
	// 			"secondary-900": "rgb(12 74 110)",
	// 			"accent-100": "rgb(224 231 255)",
	// 			"accent-200": "rgb(199 210 254)",
	// 			"accent-300": "rgb(165 180 252)",
	// 			"accent-400": "rgb(129 140 248)",
	// 			"accent-500": "rgb(99 102 241)",
	// 			"accent-600": "rgb(79 70 229)",
	// 			"accent-700": "rgb(67 56 202)",
	// 			"accent-800": "rgb(55 48 163)",
	// 			"accent-900": "rgb(49 46 129)",
	// 			"success-100": "rgb(230 245 208)",
	// 			"success-200": "rgb(224 242 197)",
	// 			"success-300": "rgb(206 235 162)",
	// 			"success-400": "rgb(169 219 92)",
	// 			"success-500": "rgb(132 204 22)",
	// 			"success-600": "rgb(119 184 20)",
	// 			"success-700": "rgb(99 153 17)",
	// 			"success-800": "rgb(79 122 13)",
	// 			"success-900": "rgb(65 100 11)",
	// 			"warning-100": "rgb(251 240 206)",
	// 			"warning-200": "rgb(250 236 193)",
	// 			"warning-300": "rgb(247 225 156)",
	// 			"warning-400": "rgb(240 202 82)",
	// 			"warning-500": "rgb(234 179 8)",
	// 			"warning-600": "rgb(211 161 7)",
	// 			"warning-700": "rgb(176 134 6)",
	// 			"warning-800": "rgb(140 107 5)",
	// 			"warning-900": "rgb(115 88 4)",
	// 			"danger-100": "rgb(246 209 228)",
	// 			"danger-200": "rgb(244 198 221)",
	// 			"danger-300": "rgb(238 163 200)",
	// 			"danger-400": "rgb(225 94 159)",
	// 			"danger-500": "rgb(212 25 118)",
	// 			"danger-600": "rgb(191 23 106)",
	// 			"danger-700": "rgb(159 19 89)",
	// 			"danger-800": "rgb(127 15 71)",
	// 			"danger-900": "rgb(104 12 58)",
	// 			"surface-100": "rgb(249 250 251)",
	// 			"surface-200": "rgb(243 244 246)",
	// 			"surface-300": "rgb(229 231 235)",
	// 			"surface-400": "rgb(156 163 175)",
	// 			"surface-500": "rgb(107 114 128)",
	// 			"surface-600": "rgb(75 85 99)",
	// 			"surface-700": "rgb(55 65 81)",
	// 			"surface-800": "rgb(31 41 55)",
	// 			"surface-900": "rgb(17 24 39)",
	// 			"color-scheme": "light"
	// 		},
	// 		"dark": {
	// 			"primary-content": "rgb(0 0 0)",
	// 			"secondary-content": "rgb(0 0 0)",
	// 			"accent-content": "rgb(255 255 255)",
	// 			"success-content": "rgb(0 0 0)",
	// 			"warning-content": "rgb(0 0 0)",
	// 			"danger-content": "rgb(255 255 255)",
	// 			"surface-content": "rgb(255 255 255)",
	// 			"primary-100": "rgb(219 234 254)",
	// 			"primary-200": "rgb(191 219 254)",
	// 			"primary-300": "rgb(147 197 253)",
	// 			"primary-400": "rgb(96 165 250)",
	// 			"primary-500": "rgb(59 130 246)",
	// 			"primary-600": "rgb(37 99 235)",
	// 			"primary-700": "rgb(29 78 216)",
	// 			"primary-800": "rgb(30 64 175)",
	// 			"primary-900": "rgb(30 58 138)",
	// 			"secondary-100": "rgb(224 242 254)",
	// 			"secondary-200": "rgb(186 230 253)",
	// 			"secondary-300": "rgb(125 211 252)",
	// 			"secondary-400": "rgb(56 189 248)",
	// 			"secondary-500": "rgb(14 165 233)",
	// 			"secondary-600": "rgb(2 132 199)",
	// 			"secondary-700": "rgb(3 105 161)",
	// 			"secondary-800": "rgb(7 89 133)",
	// 			"secondary-900": "rgb(12 74 110)",
	// 			"accent-100": "rgb(224 231 255)",
	// 			"accent-200": "rgb(199 210 254)",
	// 			"accent-300": "rgb(165 180 252)",
	// 			"accent-400": "rgb(129 140 248)",
	// 			"accent-500": "rgb(99 102 241)",
	// 			"accent-600": "rgb(79 70 229)",
	// 			"accent-700": "rgb(67 56 202)",
	// 			"accent-800": "rgb(55 48 163)",
	// 			"accent-900": "rgb(49 46 129)",
	// 			"success-100": "rgb(230 245 208)",
	// 			"success-200": "rgb(224 242 197)",
	// 			"success-300": "rgb(206 235 162)",
	// 			"success-400": "rgb(169 219 92)",
	// 			"success-500": "rgb(132 204 22)",
	// 			"success-600": "rgb(119 184 20)",
	// 			"success-700": "rgb(99 153 17)",
	// 			"success-800": "rgb(79 122 13)",
	// 			"success-900": "rgb(65 100 11)",
	// 			"warning-100": "rgb(251 240 206)",
	// 			"warning-200": "rgb(250 236 193)",
	// 			"warning-300": "rgb(247 225 156)",
	// 			"warning-400": "rgb(240 202 82)",
	// 			"warning-500": "rgb(234 179 8)",
	// 			"warning-600": "rgb(211 161 7)",
	// 			"warning-700": "rgb(176 134 6)",
	// 			"warning-800": "rgb(140 107 5)",
	// 			"warning-900": "rgb(115 88 4)",
	// 			"danger-100": "rgb(246 209 228)",
	// 			"danger-200": "rgb(244 198 221)",
	// 			"danger-300": "rgb(238 163 200)",
	// 			"danger-400": "rgb(225 94 159)",
	// 			"danger-500": "rgb(212 25 118)",
	// 			"danger-600": "rgb(191 23 106)",
	// 			"danger-700": "rgb(159 19 89)",
	// 			"danger-800": "rgb(127 15 71)",
	// 			"danger-900": "rgb(104 12 58)",
	// 			"surface-100": "rgb(55 65 81)",
	// 			"surface-200": "rgb(31 41 55)",
	// 			"surface-300": "rgb(17 24 39)",
	// 			"surface-400": "rgb(156 163 175)",
	// 			"surface-500": "rgb(107 114 128)",
	// 			"surface-600": "rgb(75 85 99)",
	// 			"surface-700": "rgb(55 65 81)",
	// 			"surface-800": "rgb(31 41 55)",
	// 			"surface-900": "rgb(17 24 39)",
	// 			"color-scheme": "dark"
	// 		}
	// 	}
	// },
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