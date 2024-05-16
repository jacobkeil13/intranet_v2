<script lang="ts">
	import { onMount } from 'svelte';

	export let columns: number = 3;
	let layout: string;

	onMount(() => {
		if (columns === 1) {
			layout = 'grid-cols-1 mobile:grid-cols-1 desktop:grid-cols-1';
		}
		if (columns === 2) {
			layout = 'grid-cols-1 mobile:grid-cols-2 desktop:grid-cols-2';
		}
		if (columns === 3) {
			layout = 'grid-cols-1 mobile:grid-cols-2 desktop:grid-cols-3';
		}
	});
</script>

<section class="grid {layout} mobile:divide-x border rounded-t-md bg-white/60 shadow-lg min-h-48">
	<slot />
</section>
