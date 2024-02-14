<script lang="ts">
	import { Toggle, Button, Dialog, Tooltip, Switch, NumberStepper } from "svelte-ux";
</script>

<Toggle let:on={open} let:toggle>
  <Tooltip title="Settings" cursor offset={8} placement="left">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <i class="fa-solid fa-gear hover:rotate-45 duration-150 cursor-pointer text-white/90" on:click={toggle}></i>
  </Tooltip>
  <Dialog {open} on:close={toggle} classes={{ dialog: "w-[450px]", title: "pt-3 pb-0" }}>
    <div slot="title" class="flex justify-between items-center">
    </div>
    <div class="px-6 space-y-2">
      <h1 class="text-lg font-medium">Settings</h1>
      <div class="flex items-center justify-between bg-gray-400/30 rounded-md border border-gray-600/30 px-2 py-1">
        <div>
          <h1 class="font-medium">Jacob Keil</h1>
          <p class="font-regular text-sm text-black/50">Technology & Systems Analyst</p>
        </div>
        <i class="fa-solid fa-user-gear pr-2 text-black/40"></i>
      </div>
      <label class="flex gap-2 items-center text-sm">
        <Switch let:checked color="primary">
          {#if checked}
            <i class="fa-light fa-check fa-md text-black/50"></i>
          {:else}
            <i class="fa-light fa-xmark fa-md text-black/50"></i>
          {/if}
        </Switch>
        Keep sidebar open by default.
      </label>
      <hr class="my-3">
      <label class="flex gap-2 items-center text-sm">
        <NumberStepper min={10} max={100} value={10}  />
        Default number of items on a page
      </label>
      <br>
    </div>
    <div slot="actions">
      <Button
        on:click={() => {
          console.log("Saving item...");
        }}
        variant="fill"
        color="primary"
      >
        Save
      </Button>
      <Button variant="fill-light">Cancel</Button>
    </div>
  </Dialog>
</Toggle>