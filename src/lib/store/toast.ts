import type { Toast } from "$lib/util/types";
import { writable, type Writable } from "svelte/store";

export let toast_store: Writable<Toast[]> = writable([])

export const add_toast = (toast: Toast) => {
  const uuid = crypto.randomUUID();

  const default_toast: Toast = {
    id: uuid,
    message: "some message",
    description: null,
    type: "info",
    duration: 3000,
    dismissable: true
  }

  toast.id = uuid;

  toast_store.update((all) => [{ ...default_toast, ...toast }, ...all]);

  if (toast.duration) setTimeout(() => dismissToast(uuid), toast.duration);
}

export const dismissToast = (id: string) => {
  toast_store.update((all) => all.filter((t) => t.id !== id));
}