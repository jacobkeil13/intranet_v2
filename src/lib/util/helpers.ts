import type { Writable } from "svelte/store";
import type { Order } from "./types";

export const api_key = '7a54b9e9e18e4b3ba65bc06a8e087f5f200963a9813940c698fa5463a111bd1d';
export const retired_token = ' <<--RETIRED-->>';

export async function getAppointments(owner: string) {
  let res = await fetch(`
    /api/appointments?owner=${owner}
  `, {
    method: "GET"
  })
  let response = await res.json();
  return response;
}

export async function sortByHeader(name: string, order: Order, fetchData: () => Promise<void>, not_sortable: any[]): Promise<Order> {
  if (!not_sortable.includes(name)) {
    order.last_order = order.current_order;
    order.last_header = order.current_header;
    if (order.current_order === 'asc' && order.last_header === order.current_header) {
      order.current_header = name;
      order.current_order = 'desc';
    } else {
      order.current_header = name;
      order.current_order = 'asc';
    }
    fetchData();
  }

  return order;
}

export async function openFormUpdate(id: string, formUpdateId: Writable<string>, formUpdateOpen: Writable<boolean>) {
  formUpdateId.set(id);
  formUpdateOpen.set(true);
  // return [ formUpdateId, formUpdateOpen ]
}

export function noWrap(value: any): string {
  return `<p class='text-nowrap'>${value}</p>`;
}