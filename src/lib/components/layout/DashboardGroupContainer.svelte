<script lang="ts">
	import { Tooltip } from 'svelte-ux';

	export let title: string;
	export let item_num: number = 0;

	console.log($$slots);
</script>

<div>
	<div class="flex justify-between items-center p-2">
		<h1>{title}</h1>
		<div class="flex gap-2 items-center">
			<Tooltip title="Refresh" offset={8} placement="top">
				<i
					class="fa-regular fa-arrow-rotate-right fa-sm hover:rotate-45 duration-100 cursor-pointer"
				/>
			</Tooltip>
			<Tooltip title="Up to date" offset={8} placement="top">
				<div class="rounded-full bg-usfGreen w-[14px] h-[14px] cursor-pointer"></div>
			</Tooltip>
		</div>
	</div>
	<hr />
	<div class="text-sm grid grid-cols-1 gap divide-y last:border-none">
		<slot />
		{#if item_num > 4}
			<div class="grid grid-cols-[1fr_auto] px-2 py-[13.5px] cursor-pointer bg-white h-full">
				<div>
					<h1 class="font-medium text-black/50 italic">{item_num - 4} more pending...</h1>
				</div>
			</div>
		{:else if item_num === 0}
			<div class="p-2">
				<p class="italic text-black/50 font-medium">None assigned</p>
			</div>
		{:else if item_num < 4}
			<div class="grid grid-cols-[1fr_auto] px-2 py-1 cursor-pointer bg-white"></div>
		{/if}
	</div>
</div>
