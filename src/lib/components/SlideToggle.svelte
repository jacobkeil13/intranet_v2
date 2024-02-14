<script lang="ts">
	import { Switch } from "svelte-ux";
</script>

<label class="flex gap-2 items-center text-sm">
  <Switch let:checked color="blue">
    {#if checked}
      <i class="fa-light fa-check fa-md text-black/50"></i>
    {:else}
      <i class="fa-light fa-xmark fa-md text-black/50"></i>
    {/if}
  </Switch>
  Keep sidebar open by default.
</label>