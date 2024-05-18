<script lang="ts">
	import {
		DashboardCard,
		LoadedWrapper,
		DashboardGroup,
		DashboardGroupContainer,
		DashboardGroupItem
	} from '$lib';
	import moment from 'moment';
	export let data;

	let hasLoadedOnce = false;
	setTimeout(() => {
		hasLoadedOnce = true;
	}, 0);
</script>

<LoadedWrapper bind:hasLoadedOnce>
	<svelte:fragment slot="content">
		<section class="flex justify-between items-center py-4 gap-8">
			<h1 class="text-xl font-normal">
				Hi, <span class="font-medium">Jacob</span> - Happy {moment().format('dddd')}!
			</h1>
			{moment().format('MM-DD-YYYY')}
		</section>

		<br />

		<DashboardGroup>
			<DashboardGroupContainer title="My Referrals" item_num={4}>
				<DashboardGroupItem content="Nour El Houda Tinzefte">
					<div class="flex gap-1" slot="description">
						<p class="font-medium text-black/50">U84394541</p>
						&#x2022;
						<p class="text-red-700/70 italic font-medium">1 day overdue</p>
					</div>
					<div slot="end">
						<div class="rounded-full bg-orange-400 w-[14px] h-[14px] cursor-pointer"></div>
					</div>
				</DashboardGroupItem>
				<DashboardGroupItem content="Dylan Mandel">
					<div class="flex gap-1" slot="description">
						<p class="font-medium text-black/50">U68611365</p>
						&#x2022;
						<p class="text-usfGreen/70 italic font-medium">1 day left</p>
					</div>
					<div slot="end">
						<div class="rounded-full bg-orange-400 w-[14px] h-[14px] cursor-pointer"></div>
					</div>
				</DashboardGroupItem>
				<DashboardGroupItem content="Dylan Mandel">
					<div class="flex gap-1" slot="description">
						<p class="font-medium text-black/50">U68611365</p>
						&#x2022;
						<p class="text-usfGreen/70 italic font-medium">1 day left</p>
					</div>
					<div slot="end">
						<div class="rounded-full bg-orange-400 w-[14px] h-[14px] cursor-pointer"></div>
					</div>
				</DashboardGroupItem>
				<DashboardGroupItem content="Dylan Mandel">
					<div class="flex gap-1" slot="description">
						<p class="font-medium text-black/50">U68611365</p>
						&#x2022;
						<p class="text-usfGreen/70 italic font-medium">1 day left</p>
					</div>
					<div slot="end">
						<div class="rounded-full bg-orange-400 w-[14px] h-[14px] cursor-pointer"></div>
					</div>
				</DashboardGroupItem>
			</DashboardGroupContainer>
			<DashboardGroupContainer title="My Collaborations" item_num={2}>
				<DashboardGroupItem content="Dylan Mandel">
					<div class="flex gap-1" slot="description">
						<p class="font-medium text-black/50">U68611365</p>
						&#x2022;
						<p class="text-usfGreen/70 italic font-medium">1 day left</p>
					</div>
					<div slot="end">
						<div class="rounded-full bg-orange-400 w-[14px] h-[14px] cursor-pointer"></div>
					</div>
				</DashboardGroupItem>
				<DashboardGroupItem content="Nour El Houda Tinzefte">
					<div class="flex gap-1" slot="description">
						<p class="font-medium text-black/50">U84394541</p>
						&#x2022;
						<p class="text-red-700/70 italic font-medium">1 day overdue</p>
					</div>
					<div slot="end">
						<div class="rounded-full bg-orange-400 w-[14px] h-[14px] cursor-pointer"></div>
					</div>
				</DashboardGroupItem>
			</DashboardGroupContainer>
			<DashboardGroupContainer title="My Appointments" item_num={2}>
				<DashboardGroupItem content="Zoe Solar">
					<div class="flex gap-1" slot="description">
						<p class="font-medium text-black/50">U68611365</p>
						&#x2022;
						<p class="text-usfGreen/70 italic font-medium">in 2 hours</p>
					</div>
					<div slot="end">
						<i class="fa-solid fa-phone fa-md text-black/50"></i>
					</div>
				</DashboardGroupItem>
				<DashboardGroupItem content="Asaiah Dewitt">
					<div class="flex gap-1" slot="description">
						<p class="font-medium text-black/50">U58542949</p>
						&#x2022;
						<p class="text-usfGreen/70 italic font-medium">in 1 day</p>
					</div>
					<div slot="end">
						<i class="fa-solid fa-phone fa-md text-black/50"></i>
					</div>
				</DashboardGroupItem>
			</DashboardGroupContainer>
		</DashboardGroup>

		<br />

		<DashboardGroup columns={2}>
			<DashboardGroupContainer title="My IS Queue Requests" item_num={5}>
				<DashboardGroupItem content="Update Net Price Calculator (NPC) on OFA Webpage">
					<div class="flex gap-1" slot="description">
						<p class="font-medium text-black/50">Website - Update</p>
						&#x2022;
						<p class="text-red-700/70 italic font-medium">1 day overdue</p>
					</div>
					<div slot="end">
						<div class="rounded-full bg-red-700 w-[14px] h-[14px] cursor-pointer"></div>
					</div>
				</DashboardGroupItem>
				<DashboardGroupItem content="2425 Budgets Modified Programs">
					<div class="flex gap-1" slot="description">
						<p class="font-medium text-black/50">Website - Update</p>
						&#x2022;
						<p class="text-usfGreen/70 italic font-medium">1 day left</p>
					</div>
					<div slot="end">
						<div class="rounded-full bg-orange-400 w-[14px] h-[14px] cursor-pointer"></div>
					</div>
				</DashboardGroupItem>
				<DashboardGroupItem content="Dylan Mandel">
					<div class="flex gap-1" slot="description">
						<p class="font-medium text-black/50">U68611365</p>
						&#x2022;
						<p class="text-usfGreen/70 italic font-medium">1 day left</p>
					</div>
					<div slot="end">
						<div class="rounded-full bg-orange-400 w-[14px] h-[14px] cursor-pointer"></div>
					</div>
				</DashboardGroupItem>
				<DashboardGroupItem content="Dylan Mandel">
					<div class="flex gap-1" slot="description">
						<p class="font-medium text-black/50">U68611365</p>
						&#x2022;
						<p class="text-usfGreen/70 italic font-medium">1 day left</p>
					</div>
					<div slot="end">
						<div class="rounded-full bg-orange-400 w-[14px] h-[14px] cursor-pointer"></div>
					</div>
				</DashboardGroupItem>
			</DashboardGroupContainer>
			<DashboardGroupContainer title="My DR Queue Requests" item_num={2}>
				<DashboardGroupItem content="Nour El Houda Tinzefte">
					<div class="flex gap-1" slot="description">
						<p class="font-medium text-black/50">U84394541</p>
						&#x2022;
						<p class="text-red-700/70 italic font-medium">1 day overdue</p>
					</div>
					<div slot="end">
						<div class="rounded-full bg-orange-400 w-[14px] h-[14px] cursor-pointer"></div>
					</div>
				</DashboardGroupItem>
				<DashboardGroupItem content="2425 Budgets Modified Programs">
					<div class="flex gap-1" slot="description">
						<p class="font-medium text-black/50">Website - Update</p>
						&#x2022;
						<p class="text-usfGreen/70 italic font-medium">1 day left</p>
					</div>
					<div slot="end">
						<div class="rounded-full bg-orange-400 w-[14px] h-[14px] cursor-pointer"></div>
					</div>
				</DashboardGroupItem>
			</DashboardGroupContainer>
		</DashboardGroup>
		<br />

		<section
			class="grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-2"
		>
			<DashboardCard
				line={true}
				icon="fa-file-lines"
				stat={24}
				label="Pending • Phone Appts."
				href="/appointments?tab=0&filter=my"
			>
				<svelte:fragment slot="content">
					<h1 class="font-medium">
						<span class="font-semibold">{4} <span class="font-light">assigned to me</span></span>
					</h1>
				</svelte:fragment>
			</DashboardCard>
			<DashboardCard
				line={true}
				icon="fa-person-walking-arrow-right"
				iconColor="text-usfGreen/70"
				stat={0}
				label="Pending • Walk-ins"
				href="/appointments?tab=2"
			>
				<svelte:fragment slot="content">
					<h1 class="font-medium">
						<span class="font-semibold">{0} <span class="font-light">assigned to me</span></span>
					</h1>
				</svelte:fragment>
			</DashboardCard>
			<DashboardCard
				line={true}
				icon="fa-person-circle-question"
				iconColor="text-usfGreen/70"
				stat={30}
				label="Pending • Referrals"
				href="/referrals?filter=my"
			>
				<svelte:fragment slot="content">
					<h1 class="font-medium">
						<span class="font-semibold">{1} <span class="font-light">assigned to me</span></span>
					</h1>
				</svelte:fragment>
			</DashboardCard>
		</section>
	</svelte:fragment>
</LoadedWrapper>
