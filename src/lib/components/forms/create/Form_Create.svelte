<script lang="ts">
	import type { FormObject } from '$lib/util/types';
	import moment from 'moment';
	import { enhance } from '$app/forms';
	import { Button, Checkbox, DateField, Dialog, TextField, SelectField, Tooltip } from 'svelte-ux';
	import { writable } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let open = false;
	let show_errors = false;

	const not_required = ['updatedAt'];

	let users: any = [];
	let aid_years: any = [];

	const form_data = writable<FormObject>({
		name: undefined,
		rraareqCode: undefined,
		owner: undefined,
		aidYear: undefined,
		updatedAt: undefined,
		bdms: false,
		web: false
	});

	function close_form() {
		open = false;
		show_errors = false;
		form_data.set({
			name: undefined,
			rraareqCode: undefined,
			owner: undefined,
			aidYear: undefined,
			updatedAt: undefined,
			bdms: false,
			web: false
		});
	}

	function check_null(value: any): boolean {
		return value === '' || value === null || value === undefined;
	}

	onMount(async () => {
		let response = await fetch(`http://localhost:5173/api/phone_list/options`);
		let result = await response.json();
		users = result.users;

		response = await fetch(`http://localhost:5173/api/aid_years/options`);
		result = await response.json();
		aid_years = result.aid_years;
	});
</script>

<Tooltip title="Create Form" offset={8} placement="left">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<i
		class="fa-solid fa-plus text-xl text-accSlate hover:scale-125 duration-100 cursor-pointer mt-1"
		on:click={() => {
			open = !open;
		}}
	/>
</Tooltip>

<Dialog bind:open class="m-6 w-full mobile:max-w-[600px] max-h-[calc(100%_-_5rem)]" persistent>
	<div slot="title" class="flex justify-between items-center">
		<h1 class="font-medium">Create Form</h1>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<i class="fa-solid fa-xmark cursor-pointer" on:click={close_form}></i>
	</div>
	<form
		method="POST"
		action="/documents/forms?/create"
		enctype="multipart/form-data"
		use:enhance={({ cancel }) => {
			let hasErrors = false;
			Object.keys($form_data).forEach((key) => {
				console.log($form_data[key]);
				if (check_null($form_data[key]) && !not_required.includes(key)) {
					cancel();
					hasErrors = true;
					show_errors = true;
				}
			});
			if (!hasErrors) {
				close_form();
			}
		}}
	>
		<input name="name" type="hidden" value={$form_data.name} />
		<input name="rraareqCode" type="hidden" value={$form_data.rraareqCode} />
		<input name="owner" type="hidden" value={$form_data.owner} />
		<input name="aidYear" type="hidden" value={$form_data.aidYear} />
		<input
			name="updatedAt"
			type="hidden"
			value={check_null($form_data.updatedAt)
				? ''
				: moment($form_data.updatedAt).format('YYYY-MM-DD')}
		/>
		<input name="bdms" type="hidden" value={$form_data.bdms} />
		<input name="web" type="hidden" value={$form_data.web} />

		<div class="px-6 space-y-3 pb-6">
			<div>
				<p class="text-sm text-black/60 font-medium">File Name</p>
				<TextField
					bind:value={$form_data.name}
					clearable
					placeholder="File name without extension"
				/>
				{#if show_errors && check_null($form_data.name)}
					<p
						class="text-red-700 text-sm pt-1"
						in:fly={{ x: -10, duration: 200 }}
						out:fly={{ x: -10, duration: 200 }}
					>
						<i class="fa-solid fa-circle-info pr-1"></i>File Name is required.
					</p>
				{/if}
			</div>
			<div>
				<p class="text-sm text-black/60 font-medium">RRAAREQ Code</p>
				<TextField bind:value={$form_data.rraareqCode} clearable placeholder="RRAAREQ Code" />
				{#if show_errors && check_null($form_data.rraareqCode)}
					<p
						class="text-red-700 text-sm pt-1"
						in:fly={{ x: -10, duration: 200 }}
						out:fly={{ x: -10, duration: 200 }}
					>
						<i class="fa-solid fa-circle-info pr-1"></i>RRAAREQ code is required.
					</p>
				{/if}
			</div>
			<div class="grid grid-cols-1 mobile:grid-cols-2 gap-3">
				<div>
					<p class="text-sm text-black/60 font-medium">Owner</p>
					<SelectField placeholder="No selection" options={users} bind:value={$form_data.owner} />
					{#if show_errors && check_null($form_data.owner)}
						<p
							class="text-red-700 text-sm pt-1"
							in:fly={{ x: -10, duration: 200 }}
							out:fly={{ x: -10, duration: 200 }}
						>
							<i class="fa-solid fa-circle-info pr-1"></i>Owner is required.
						</p>
					{/if}
				</div>
				<div>
					<p class="text-sm text-black/60 font-medium">Aid Year</p>
					<SelectField
						placeholder="No selection"
						options={aid_years}
						bind:value={$form_data.aidYear}
					/>
					{#if show_errors && check_null($form_data.aidYear)}
						<p
							class="text-red-700 text-sm pt-1"
							in:fly={{ x: -10, duration: 200 }}
							out:fly={{ x: -10, duration: 200 }}
						>
							<i class="fa-solid fa-circle-info pr-1"></i>Aid year is required.
						</p>
					{/if}
				</div>
			</div>
			<div class="mobile:flex gap-3">
				<div class="flex-grow">
					<p class="text-sm text-black/60 font-medium">Updated At</p>
					<DateField
						bind:value={$form_data.updatedAt}
						picker
						clearable
						classes={{ field: { container: "font-['Kanit']" } }}
					/>
				</div>
				<div class="flex gap-4 mt-5">
					<Checkbox bind:checked={$form_data.bdms}>BDMS?</Checkbox>
					<Checkbox bind:checked={$form_data.web}>Web?</Checkbox>
				</div>
			</div>
			<div class="grid grid-cols-2 gap-3 mt-2">
				<Button on:click={close_form} classes={{ root: 'bg-gray-200 hover:bg-gray-300' }}
					>Cancel</Button
				>
				<!-- <Button classes={{ root: "bg-gray-200 hover:bg-gray-300" }}>Create Form</Button> -->
				<input
					class="bg-blue-600 hover:bg-blue-500 duration-200 text-white/90 cursor-pointer text-sm rounded-[.25rem]"
					type="submit"
					value="Create Form"
				/>
			</div>
		</div>
	</form>
</Dialog>
