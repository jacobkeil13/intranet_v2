<script lang="ts">
	import { Filter, FormUpdate, FormCreate, FilterChips, Table, LoadedWrapper } from '$lib';
	import { aid_year_tabs } from '$lib/store/helpers';
	import { add_toast } from '$lib/store/toast.js';
	import { noWrap, openFormUpdate, sortByHeader } from '$lib/util/helpers.js';
	import { onMount, tick } from 'svelte';
	import {
		Pagination,
		paginationStore,
		ProgressCircle,
		Breadcrumb,
		Checkbox,
		TextField,
		Tab,
		Tabs,
		debounceStore,
		matchMediaWidth
	} from 'svelte-ux';
	import { writable } from 'svelte/store';
	export let data;
	export let form;

	let isMobileScreen = matchMediaWidth(500);
	let pagination = paginationStore({ total: data.total, perPage: data.forms.length, page: 1 });
	let table_data: any = [];
	let isLoading = false;
	let hasLoadedOnce = false;
	let promise: any;

	$: current_tab = 'all';
	let previousPage = 1;
	let previousPerPage = data.forms.length;
	let items = ['Documents', 'Forms'];
	let not_sortable: any[] = [];
	let search = writable('');
	let filter_search = debounceStore(search, 600);
	let formUpdateOpen = writable(false);
	let formUpdateId = writable('');

	const columns = writable([
		{ name: 'rraareqCode', label: 'RRAAREQ Code' },
		{ name: 'aidYear', label: 'Aid Year', format: true },
		{ name: 'name', label: 'File Name' },
		{ name: 'owner', label: 'Owner', format: true },
		{ name: 'updatedAt', label: 'Last Updated' }
	]);

	const tabs = writable([
		{ label: 'All Forms', name: 'all' },
		{ label: 'last_year', name: 'last_year' },
		{ label: 'current_year', name: 'current_year' },
		{ label: 'next_year', name: 'next_year' },
		{ label: 'Non-Year', name: 'non_year' },
		{ label: 'Retired', name: 'retired' }
	]);

	const filter = writable({
		options: [
			{ name: 'My Forms', value: 'owner', checked: false },
			{ name: 'Out of Date', value: 'outdated', checked: false }
		]
	});

	const order = writable({
		current_header: 'name',
		last_header: 'name',
		current_order: 'asc',
		last_order: 'asc'
	});

	onMount(async () => {
		promise = fetchData();
	});

	function reset_filters() {
		$filter.options.forEach((option) => (option.checked = false));
		$order.current_header = 'name';
		$order.current_order = 'asc';
		$search = '';
		$filter = $filter;
		current_tab = 'all';
	}

	async function fetchData() {
		if (isLoading) return;

		previousPage = $pagination.page;
		previousPerPage = $pagination.perPage;

		const response = await fetch(
			`http://localhost:5173/api/forms?
				limit=${$pagination.perPage}
				&skip=${($pagination.page - 1) * $pagination.perPage}
				&netid=${data.user.netid}
				&type=${current_tab}
				&sort=${$order.current_header}
				&order=${$order.current_order}
				${$search !== '' && search !== null ? '&search=' + $search : ''}
				${
					$filter.options.filter((o) => {
						if (o.checked) return o;
					}).length > 0
						? `&filters=${$filter.options
								.map((f) => {
									if (f.checked) {
										return f.value;
									}
								})
								.join(',')}`
						: ''
				}`
		);
		if (!response.ok) {
			isLoading = false;
			return;
		}
		const result = await response.json();
		table_data = result.forms;

		pagination.setTotal(result.total);
		isLoading = false;
		await tick();

		if (!hasLoadedOnce) {
			hasLoadedOnce = true;
		}
	}

	$: {
		if (form) {
			add_toast({
				message: form.message,
				description: (form.new_form ? form.new_form.name : form.name) || '',
				type: form.status,
				duration: 5000,
				dismissable: false
			});
			fetchData();
		}
	}

	$: {
		if (current_tab || $filter || $filter_search || $order) {
			pagination.setPage(1);
			fetchData();
		}
	}

	$: {
		if ($pagination.page !== previousPage) {
			fetchData();
		} else if ($pagination.perPage !== previousPerPage) {
			pagination.setPage(1);
			fetchData();
		}
	}
</script>

<svelte:head>
	<title>OFA • Forms</title>
	<meta name="description" content="Forms Page" />
</svelte:head>

<LoadedWrapper bind:hasLoadedOnce>
	<svelte:fragment slot="content">
		<div class="flex justify-between items-center pb-4">
			<Breadcrumb class="text-2xl gap-2" divider="/" {items} />
			<div class="flex items-center gap-2">
				<Filter on:reset={reset_filters}>
					<div slot="search">
						<TextField clearable autofocus placeholder="Search..." bind:value={$search} />
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
				<FormCreate />
			</div>
		</div>
		<hr class="mb-6" />
		{#await promise}
			<div class="h-1/2 flex justify-center items-center">
				<ProgressCircle />
			</div>
		{:then data}
			{#if hasLoadedOnce}
				<Tabs classes={{ root: 'my-2 overflow-hidden', content: 'border-none' }}>
					{#each $tabs as tab}
						<Tab
							on:click={() => {
								current_tab = tab.name;
							}}
							selected={current_tab === tab.name}
							classes={{
								root: `py-2 px-2 mb-2 rounded-[4px] ${
									current_tab === tab.name ? 'bg-accSlate text-white/90 hover:text-white/90' : ''
								}`
							}}
						>
							<h1 class="text-[16px]">
								{tab.label.includes('_') ? aid_year_tabs[tab.label] : tab.label}
							</h1>
						</Tab>
					{/each}
				</Tabs>
			{/if}
			<FilterChips
				bind:search={$search}
				bind:options={$filter.options}
				order={$order}
				on:reset={reset_filters}
			/>
			<Table>
				<svelte:fragment slot="header">
					{#each $columns as column}
						<th
							class="p-2 text-[15px] font-medium cursor-pointer {$order.current_header ===
							column.name
								? 'text-tertiary-600'
								: 'text-black'}"
							on:click={async () => {
								let new_order = await sortByHeader(column.name, $order, fetchData, not_sortable);
								$order = new_order;
							}}
							>{column.label}
							{$order.current_header === column.name
								? $order.current_order === 'asc'
									? '↓'
									: '↑'
								: ''}</th
						>
					{/each}
				</svelte:fragment>
				<svelte:fragment slot="body">
					{#each table_data as td}
						<tr
							class="hover:bg-gray-200 bg-white/60 duration-200 cursor-pointer text-sm border-b border-black/10 last:border-none"
							on:click={async () => {
								await openFormUpdate(td.id, formUpdateId, formUpdateOpen);
							}}
						>
							<td class="p-2">{@html noWrap(td.rraareqCode)}</td>
							<td class="p-2">{@html noWrap(td.aidYear)}</td>
							<td class="p-2">{@html noWrap(td.name)}</td>
							<td class="p-2">{@html noWrap(td.owner)}</td>
							<td class="p-2">{@html noWrap(td.updatedAt)}</td>
						</tr>
					{/each}
				</svelte:fragment>
			</Table>
			{#if table_data.length === 0}
				<div class="px-4 py-2 border-x border-b border-black/20">
					<h1>No results found</h1>
				</div>
			{/if}
			<div class="float-right mb-3">
				{#if !$isMobileScreen}
					<Pagination
						{pagination}
						perPageOptions={[10, 25, 50]}
						show={['firstPage', 'prevPage', 'pagination', 'nextPage', 'lastPage']}
						classes={{ root: 'py-3', pagination: 'text-md', perPage: 'text-md' }}
					/>
				{:else}
					<Pagination
						{pagination}
						perPageOptions={[10, 25, 50]}
						show={['perPage', 'firstPage', 'prevPage', 'pagination', 'nextPage', 'lastPage']}
						classes={{ root: 'py-3', pagination: 'text-md', perPage: 'text-md' }}
					/>
				{/if}
			</div>
		{:catch error}
			<p>Error loading data</p>
			<p>{error}</p>
		{/await}
	</svelte:fragment>
</LoadedWrapper>

{#if $formUpdateOpen}
	<FormUpdate id={$formUpdateId} bind:open={$formUpdateOpen} />
{/if}
