// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Portfolio',
			sidebar: [
				{ label: 'Home', link: '/' },
				{ label: 'Projects', link: '/projects/' },
				{ label: 'Skills', link: '/skills/' },
				{ label: 'Achievements', link: '/achievements/' },
				{ label: 'Research', link: '/research/' },
				{ label: 'Contact', link: '/contact/' },
			],
			customCss: [],
		}),
	],
});
