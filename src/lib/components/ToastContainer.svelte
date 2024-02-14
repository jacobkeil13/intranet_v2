<script lang="ts">
  import { toast_store } from '$lib/store/toast';
  import { Notification, Icon } from 'svelte-ux';
  import { fly } from 'svelte/transition';

  export let placement: "top-left" | "top-right" | "bottom-left" | "bottom-right" = "top-left";
  export let animation_duration: number = 500;
  let classes = "pl-4 left-0 top-4";
  let fly_direction: number = -1;

  switch (placement) {
    case "top-left":
      classes = "pl-4 left-0 top-4";
      fly_direction = -1;
      break;
    case "top-right":
      classes = "pr-4 right-0 top-4";
      fly_direction = 1;
      break;
    case "bottom-left":
      classes = "pl-4 left-0 bottom-4";
      fly_direction = -1;
      break;
    case "bottom-right":
      classes = "pr-4 right-0 bottom-4";
      fly_direction = 1;
      break;
    default:
      classes = "pl-4 left-0 top-4";
      fly_direction = -1;
  }
</script>

<div class="absolute {classes} w-fit z-50 space-y-2 overflow-hidden">
  {#each $toast_store as toast (toast.id)}
    <div in:fly={{ duration: animation_duration, x: 500 * fly_direction }} out:fly={{ duration: animation_duration, x: 500 * fly_direction }}>
      <Notification open closeIcon={toast.dismissable}>
        <div slot="icon" class="flex items-center">
          {#if toast.type === "success"}
            <Icon path="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" width={20} height={20} viewBox="0 0 512 512" class="text-usfGreen" />
          {:else if toast.type === "error"}
            <Icon path="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c-8.8 0-16 7.2-16 16V272c0 8.8 7.2 16 16 16s16-7.2 16-16V144c0-8.8-7.2-16-16-16zm24 224a24 24 0 1 0 -48 0 24 24 0 1 0 48 0z" width={20} height={20} viewBox="0 0 512 512" class="text-red-700" />
          {:else if toast.type === "info"}
            <Icon path="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM208 352c-8.8 0-16 7.2-16 16s7.2 16 16 16h96c8.8 0 16-7.2 16-16s-7.2-16-16-16H272V240c0-8.8-7.2-16-16-16H216c-8.8 0-16 7.2-16 16s7.2 16 16 16h24v96H208zm48-168a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" width={20} height={20} viewBox="0 0 512 512" class="text-blue-500" />
          {/if}
        </div>
        <div slot="title">{toast.message}</div>
        <div slot="description">{toast.description === null ? "" : toast.description}</div>
      </Notification>
    </div>
  {/each}
</div>