<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Tooltip } from 'svelte-ux';
	const dispatch = createEventDispatcher();

	export let search: string;
	export let options: { name: string; value: string; checked: boolean }[];
	export let order: {
		current_header: string;
		last_header: string;
		current_order: string;
		last_order: string;
	} = {
		current_header: '',
		last_header: '',
		current_order: '',
		last_order: ''
	};

	function splitCamelCase(str: string) {
		let words = str.split(/(?=[A-Z])/);
		let result = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
		return result;
	}

	function resetFilters() {
		dispatch('reset');
	}
</script>

<div class="flex flex-wrap gap-x-2 gap-y-2">
	{#if search !== '' && search !== null}
		<div class="flex items-center gap-2 border border-black/20 rounded-md px-2 bg-white/60">
			<h1>"{search}"</h1>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<i class="fa-light fa-xmark cursor-pointer" on:click={() => (search = '')}></i>
		</div>
	{/if}
	{#each options as option}
		{#if option.checked}
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="flex items-center gap-2 border border-black/20 rounded-md px-2 bg-white/60">
				<h1>{option.name}</h1>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<i
					class="fa-light fa-xmark cursor-pointer"
					on:click={() => {
						option.checked = false;
					}}
				></i>
			</div>
		{/if}
	{/each}
	{#if order.current_header !== '' && order.current_order !== ''}
		<div class="flex items-center gap-2 border border-black/20 rounded-md px-2 bg-white/60">
			<h1 class="text-nowrap">
				<span class="font-medium">Order by:</span>
				"{splitCamelCase(order.current_header)}" - {order.current_order === 'asc'
					? 'Ascending'
					: 'Descending'}
			</h1>
		</div>
	{/if}
	<Tooltip title="Clear All Filters" offset={8} placement="right">
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="flex items-center gap-2 rounded-md px-2 py-1 bg-red-500 cursor-pointer"
			on:click={resetFilters}
		>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<i class="fa-light fa-xmark cursor-pointer text-white"></i>
		</div>
	</Tooltip>
</div>
<div class="my-4"></div>
