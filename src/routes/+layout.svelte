<script lang="ts">
	import { USFLogo, SidebarItem, Settings } from '$lib';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import Resources from '$lib/sections/Resources.svelte';
  import { AppBar, AppLayout, Drawer, ThemeSelect, settings } from 'svelte-ux';

  let drawerOpen = false;
</script>

<AppLayout classes={{ nav: "overflow-hidden", root: "relative overflow-hidden" }} navWidth={275}>
  <nav slot="nav" class="h-full overflow-auto">
    <SidebarItem icon="fa-grid-2" label="Dashboard" border="border-b" href="/dashboard" />
    <SidebarItem icon="fa-phone-rotary" label="Phone List" border="border-b" href="/phone_list" />
    <SidebarItem icon="fa-book-bookmark" label="Trainings" border="border-b" href="/training" />
    <SidebarItem icon="fa-calendar-days" label="Master Calendar" border="border-b" href="/master_calendar" />
    <div class="flex flex-col gap-2 p-4 border-b border-surface-400/70 duration-100 cursor-pointer">
      <SidebarItem icon="fa-arrow-trend-up" label="Chrons" target="_blank" href="https://app.powerbi.com/groups/5a0f9b38-88e0-4604-8dad-7328caeea86a/list/dashboards" />
      <SidebarItem icon="fa-user-check" label="Counter Duty" href="/counter_duty" />
      <SidebarItem icon="fa-comments" label="Appointments" href="/appointments" />
      <SidebarItem icon="fa-bell" label="Referrals" href="/referrals" />
    </div>
    <div class="flex flex-col gap-2 p-4 border-b border-surface-400/70 duration-100 cursor-pointer">
      <SidebarItem icon="fa-file-lines" label="Forms" href="/documents/forms" />
      <SidebarItem icon="fa-envelope" label="Letters" href="/documents/letters" />
      <SidebarItem icon="fa-file-word" label="S&P's" href="/documents/procedures" />
      <Drawer bind:open={drawerOpen} placement="right" class="w-full mobile:w-[400px] h-full">
        <div class="flex justify-between items-center p-4">
          <h1 class="font-medium">Quick Resources</h1>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <i class="fa-solid fa-xmark cursor-pointer" on:click={() => { drawerOpen = false }}></i>
        </div>
        <Resources />
      </Drawer>
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div 
        on:click={() => (drawerOpen = true)}
        class="flex items-center justify-between border-white/10 cursor-pointer group"
      >
        <h1 class="font-normal text-md duration-200 text-white/90">Quick Resources / Links</h1>
        <div class="flex items-center justify-center w-6 h-6 rounded-full">
          <i class="fa-solid fa-link fa-lg text-white/80 group-hover:text-orange-300 group-hover:-translate-x-1 group-hover:fa-solid duration-200" />
        </div>
      </div>
      <SidebarItem icon="fa-file-excel" label="Track Spreadsheet" href="/track_spreadsheet" />
    </div>
    <div class="flex flex-col gap-2 p-4 border-b border-white/10 duration-100 cursor-pointer">
      <SidebarItem icon="fa-info-circle" label="IS Queue" href="/is_queue" />
      <SidebarItem icon="fa-database" label="DR Queue" href="/dr_queue" />
    </div>
    <div class="flex flex-col gap-2 p-4 border-b border-white/10 duration-100 cursor-pointer">
      <SidebarItem icon="fa-file-circle-plus" label="Reports" target="_blank" href="http://131.247.181.30:8080/apex/f?p=115:15" />
      <SidebarItem icon="fa-chart-simple" label="Visitor Stats" href="/visitor_stats" />
      <SidebarItem icon="fa-street-view" label="Population Selections" href="/popsel" />
    </div>
  </nav>

  <AppBar>
    <div slot="title" class="flex items-center justify-between w-full text-white/90">
      <span class="flex items-center space-x-2 px-4">
        <USFLogo />
        <strong class="text-xl text-white/90">OFA Intranet</strong>
      </span>
      <span class="flex items-center gap-3">
        <Settings />
      </span>
    </div>
  </AppBar>

  <main class="scroll-smooth w-full p-4 bg-surface-200" id="wrapper">
    <div class="max-w-[1400px] mx-auto">
      <slot />
    </div>
  </main>

  <ToastContainer placement="top-left" animation_duration={750} />
</AppLayout>

<style lang="postcss">
  @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :global(body) {
    font-family: "Kanit", sans-serif;
  }

  :global(nav) {
    @apply bg-accSlate shadow-md overflow-scroll overflow-x-hidden;
  }

  :global(.AppLayout > .AppBar) {
    @apply bg-accSlate text-white shadow-md;
  }

  #wrapper {
    background: rgb(255, 255, 255);
		background-image: radial-gradient(rgb(230, 230, 230) 1px, transparent 0);
		background-size: 18px 18px;
		background-position: -19px -19px;
  }
</style>