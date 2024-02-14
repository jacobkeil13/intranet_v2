<script lang="ts">
  import { DashboardCard } from "$lib";
	import { add_toast } from "$lib/store/toast";
  import moment from 'moment';

  export let data;

  console.log(data.nextTraining);
  
</script>

<section class="flex gap-8">
  <h1 class="text-xl font-normal">Hi, <span class="font-medium">Jacob</span> - Happy {moment().format("dddd")}!</h1>
  <button on:click={() => {
      add_toast({
        id: "",
        message: "Saved Successfully!",
        description: "updated the name",
        type: "success",
        duration: 5000,
        dismissable: false
      })
  }}>
    Add Toast
  </button>
</section>

<br>

<section class="grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-2">
  <DashboardCard line={true} icon="fa-phone" stat={24} iconColor="text-usfGreen/70" label="Pending • Phone Appts." href="/appointments?tab=0&filter=my">
    <svelte:fragment slot="content">
      <h1 class="font-medium"><span class="font-semibold">{4} <span class="font-light">assigned to me</span></span></h1>
    </svelte:fragment>
  </DashboardCard>
  <DashboardCard
    line={true}
    icon="fa-person-arrow-down-to-line"
    iconColor="text-usfGreen/70"
    stat={0}
    label="Pending • In-person Appts."
    href="/appointments?tab=1&filter=my"
  >
    <svelte:fragment slot="content">
      <h1 class="font-medium"><span class="font-semibold">{4} <span class="font-light">assigned to me</span></span></h1>
    </svelte:fragment>
  </DashboardCard>
  <DashboardCard line={true} icon="fa-person-circle-question" iconColor="text-usfGreen/70" stat={30} label="Pending • Referrals" href="/referrals?filter=my">
    <svelte:fragment slot="content">
      <h1 class="font-medium"><span class="font-semibold">{1} <span class="font-light">assigned to me</span></span></h1>
    </svelte:fragment>
  </DashboardCard>
  <DashboardCard line={true} icon="fa-person-walking-arrow-right" iconColor="text-usfGreen/70" stat={0} label="Pending • Walk-ins" href="/appointments?tab=2">
    <svelte:fragment slot="content">
      <h1 class="font-medium"><span class="font-semibold">{0} <span class="font-light">assigned to me</span></span></h1>
    </svelte:fragment>
  </DashboardCard>
</section>

<br>

<section class="grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-2">
  <DashboardCard line={true} icon="fa-file-lines" stat={24} label="Pending • Phone Appts." href="/appointments?tab=0&filter=my">
    <svelte:fragment slot="content">
      <h1 class="font-medium"><span class="font-semibold">{4} <span class="font-light">assigned to me</span></span></h1>
    </svelte:fragment>
  </DashboardCard>
  <DashboardCard line={true} icon="fa-person-walking-arrow-right" iconColor="text-usfGreen/70" stat={0} label="Pending • Walk-ins" href="/appointments?tab=2">
    <svelte:fragment slot="content">
      <h1 class="font-medium"><span class="font-semibold">{0} <span class="font-light">assigned to me</span></span></h1>
    </svelte:fragment>
  </DashboardCard>
  <DashboardCard line={true} icon="fa-person-circle-question" iconColor="text-usfGreen/70" stat={30} label="Pending • Referrals" href="/referrals?filter=my">
    <svelte:fragment slot="content">
      <h1 class="font-medium"><span class="font-semibold">{1} <span class="font-light">assigned to me</span></span></h1>
    </svelte:fragment>
  </DashboardCard>
</section>