<script lang="ts">
	import { fly } from 'svelte/transition';
	export let hasLoadedOnce: boolean;
</script>

{#if hasLoadedOnce}
	<div class="p-2" in:fly={{ duration: 400, y: -500 }}>
		<slot name="content" />
	</div>
{/if}
