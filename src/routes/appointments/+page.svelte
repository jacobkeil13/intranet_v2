<script lang="ts">
	import moment from 'moment';
	import Filter from '$lib/components/Filter.svelte';
	import { getAppointments } from '$lib/util/helpers';
	import { Tooltip, TextField, Checkbox } from 'svelte-ux';
	import { writable } from 'svelte/store';
	export let data;

	let appointments = writable(data.appointments);

	let filter = writable({
		search: '',
		options: [
			{ name: 'Assigned to me', value: 'owner', checked: false },
			{ name: 'Completed', value: 'completed', checked: false }
		]
	});

	function reset_filters() {
		$filter.options.forEach((option) => (option.checked = false));
		$filter.search = '';
		$filter = $filter;
	}

	$: {
		if ($filter) {
			// console.log($filter);
			// let newAppointments = getAppointments($filter.options.find(fil => fil.value === "owner")?.checked ? "Jasmine Edwards" : "all").then((res) => {
			//   console.log(res.appointments);
			// 	$appointments = res.appointments;
			//   $appointments = $appointments;
			// });
		}
	}
</script>

<div class="p-2">
	<div class="flex justify-between items-center pb-4">
		<h1 class="text-2xl text-usfGreen font-medium">Appointments</h1>
		<div class="flex gap-2">
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
			<i
				class="fa-solid fa-circle-plus text-2xl text-accSlate hover:scale-125 duration-100 cursor-pointer mt-1"
			></i>
		</div>
	</div>
</div>

<section class="w-full min-w-[800px] overflow-x-auto">
	<table class="table w-full">
		<tr class="text-left border-y rounded">
			<th class="p-2">Date & Time</th>
			<th class="p-2">Type</th>
			<th class="p-2">Name</th>
			<th class="p-2">UID</th>
			<th class="p-2">Advisor</th>
			<th class="p-2">Last Updated By</th>
		</tr>
		{#each data.appointments as appt}
			<Tooltip placement="bottom-start">
				<div
					slot="title"
					class="grid grid-cols-[auto,1fr] gap-x-4 gap-y-2 bg-accSlate text-white/80 px-4 py-2 text-xs rounded shadow"
				>
					<div class="col-span-2 text-sm font-semibold">
						{moment(appt.dateTime).format('ddd, MMMM Do')}
					</div>
					<div class="text-surface-100/50 justify-self-start">Campus:</div>
					<div class="justify-self-end">{appt.studentCampus}</div>
					<div class="text-surface-100/50 justify-self-start">Scheduled By:</div>
					<div class="justify-self-end">{appt.scheduledBy}</div>
					<div class="col-span-2">{appt.reason}</div>
				</div>
				<tr
					class="hover:bg-gray-200 duration-200 cursor-pointer"
					on:click={() => console.log(appt.id)}
				>
					<td class="p-2">{moment(appt.dateTime).format('M-D-YY h:mm A')}</td>
					<td class="p-2">{appt.type.split(' ')[0]}</td>
					<td class="p-2">{appt.studentName}</td>
					<td class="p-2">{appt.studentUid}</td>
					<td class="p-2">{appt.advisor}</td>
					<td class="p-2">{appt.lastUpdatedBy || '-'}</td>
				</tr>
			</Tooltip>
		{/each}
	</table>
	<div></div>
</section>
