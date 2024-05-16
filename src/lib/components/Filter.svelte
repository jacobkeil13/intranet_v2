<script lang="ts">
	import { Button, Popover, Tooltip } from 'svelte-ux';
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';
	const dispatch = createEventDispatcher();

	export let open: boolean = false;
</script>

<div class="inline-block">
	<Popover bind:open placement="bottom-end">
		<div
			in:fly={{ y: 50, duration: 250 }}
			out:fly={{ y: 50, duration: 100 }}
			class="p-2 mt-2 border bg-white w-[300px] rounded-md"
		>
			<h1>Search & Filter</h1>
			<hr class="mt-1 mb-3" />
			<slot name="search" />
			<slot name="options" />
			<hr class="mb-4" />
			<div class="flex justify-end gap-2">
				<Button on:click={() => (open = !open)} classes={{ root: 'bg-gray-200 hover:bg-gray-300' }}
					>Close</Button
				>
				<Button
					on:click={() => dispatch('reset')}
					classes={{ root: 'bg-gray-200 hover:bg-gray-300' }}>Reset</Button
				>
			</div>
		</div>
	</Popover>
	<Tooltip title="Search & Filter" offset={8} placement="left">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<i
			class="fa-solid fa-filters text-lg text-accSlate hover:scale-125 duration-100 cursor-pointer mt-1"
			on:click={() => (open = !open)}
		></i>
	</Tooltip>
</div>
