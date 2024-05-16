<script lang="ts">
	import { Filter } from '$lib';
	import { onMount, tick } from 'svelte';
	import {
		Table,
		Pagination,
		paginationStore,
		tableOrderStore,
		ProgressCircle,
		Breadcrumb,
		Checkbox,
		TextField
	} from 'svelte-ux';
	import { writable } from 'svelte/store';
	export let data;

	let pagination = paginationStore({ total: data.total, perPage: data.users.length, page: 1 });
	let table_data: any = [];
	let isLoading = false;
	let promise: any;

	let previousPage = 1;
	let previousPerPage = data.users.length;

	const order = tableOrderStore({ initialBy: 'name', initialDirection: 'desc' });

	onMount(async () => {
		promise = fetchData();
	});

	async function fetchData() {
		if (isLoading) return;

		isLoading = true;
		previousPage = $pagination.page;
		previousPerPage = $pagination.perPage;

		const response = await fetch(
			`http://localhost:5173/api/phone_list?limit=${$pagination.perPage}&skip=${($pagination.page - 1) * $pagination.perPage}`
		);
		if (!response.ok) {
			isLoading = false;
			return;
		}
		const result = await response.json();
		table_data = result.users.map((user: any) => ({
			id: user.id,
			name: user.first_name + ' ' + user.last_name,
			netid: user.netid,
			title: user.title.name,
			team: user.team[0].name,
			phone: user.phone
		}));
		pagination.setTotal(result.total);
		isLoading = false;
		await tick();
	}

	$: {
		if ($order) console.log($order);
		if ($pagination.page !== previousPage) {
			fetchData();
		} else if ($pagination.perPage !== previousPerPage) {
			pagination.setPage(1);
			fetchData();
		}
	}

	let items = ['Phone List'];

	let filter = writable({
		search: '',
		options: [{ name: 'Student Assistants', value: 'student', checked: false }]
	});

	function reset_filters() {
		$filter.options.forEach((option) => (option.checked = false));
		$filter.search = '';
		$filter = $filter;
	}
</script>

<div class="p-2">
	<div class="flex justify-between items-center pb-4">
		<Breadcrumb class="text-2xl" {items} />
		<div class="flex items-center gap-2">
			<Filter on:reset={reset_filters}>
				<div slot="search">
					<TextField clearable autofocus placeholder="Search..." bind:value={$filter.search} />
				</div>
				<div slot="options">
					<div class="pt-3" />
					{#each $filter.options as filter_option}
						<Checkbox bind:checked={filter_option.checked}>{filter_option.name}</Checkbox>
						<br />
					{/each}
					<div class="pt-3" />
				</div>
			</Filter>
		</div>
	</div>
	<hr class="mb-6" />
	{#await promise}
		<div class="h-1/2 flex justify-center items-center">
			<ProgressCircle />
		</div>
	{:then data}
		<Table
			data={table_data}
			classes={{
				td: 'py-2 px-3',
				tr: 'hover:bg-gray-200 cursor-pointer border-b border-black/10 last:border-none',
				th: 'px-3 py-3 bg-gray-200 border-b border-black/10',
				container: 'border border-black/20 rounded-md'
			}}
			on:cellClick={(e) => {
				console.log(e);
			}}
			columns={[
				{
					name: 'name',
					header: 'Name',
					align: 'left'
				},
				{
					name: 'netid',
					header: 'Net ID',
					align: 'left'
				},
				{
					name: 'title',
					header: 'Title',
					align: 'left'
				},
				{
					name: 'team',
					header: 'Team',
					align: 'left'
				},
				{
					name: 'phone',
					header: 'Phone',
					align: 'left'
				}
			]}
		/>
		<!-- <hr class="my-3" /> -->
		<div class="float-right mb-3">
			<Pagination
				{pagination}
				perPageOptions={[15, 25, 50]}
				show={['perPage', 'firstPage', 'prevPage', 'pagination', 'nextPage', 'lastPage']}
				classes={{ root: 'py-3', pagination: 'text-md', perPage: 'text-md' }}
			/>
		</div>
	{:catch error}
		<p>Error loading data</p>
	{/await}
</div>
