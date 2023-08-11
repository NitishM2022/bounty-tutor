/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				prim: '#131315',
				second: '#222225',
				third: '#777981',
				line: '#28282b',
				unselect: '#5d5d68',
				select: '#b456e5',
				nav: '#0f0f10'
			}
		}
	},
	plugins: []
};
