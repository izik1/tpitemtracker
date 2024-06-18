import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
	plugins: [
		// fixme: @sveltejs/enhanced-img crashes s-l-s for me because it tries to run sharp which causes LD errors on my very weird system
		enhancedImages(),
		sveltekit()
	],
});
