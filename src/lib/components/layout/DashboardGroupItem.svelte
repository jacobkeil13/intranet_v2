<script lang="ts">
	export let content: string;
</script>

<div
	class="grid grid-cols-[1fr_auto] px-2 py-1 cursor-pointer bg-white hover:bg-gray-100 duration-100"
>
	<div>
		<h1>{content}</h1>
		<slot name="description" />
	</div>
	<div class="flex flex-col justify-center">
		<slot name="end" />
	</div>
</div>
