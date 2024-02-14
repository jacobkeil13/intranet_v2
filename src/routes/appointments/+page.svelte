<script lang="ts">
	import moment from "moment";
	import { Paginate, Table, Pagination, tableOrderStore, ToggleButton, Button, MultiSelectMenu, TextField } from "svelte-ux";
  const order = tableOrderStore({ initialBy: 'Date & Time', initialDirection: 'desc' });
  const data = [
    { id: 1, date: '2024-02-11T12:15:09.908Z', "Type": 305, "Name": 3.7, "UID": 67, "Advisor": 4.3, "Last Updated By": "-" },
    { id: 2, date: '2024-02-12T12:15:09.908Z', "Type": 452, "Name": 25.0, "UID": 51, "Advisor": 4.9, "Last Updated By": "-" },
    { id: 3, date: '2024-02-12T12:15:09.908Z', "Type": 262, "Name": 16.0, "UID": 24, "Advisor": 6.0, "Last Updated By": "-" },
    { id: 4, date: '2024-02-12T12:15:09.908Z', "Type": 159, "Name": 6.0, "UID": 24, "Advisor": 4.0, "Last Updated By": "-" },
    { id: 5, date: '2024-02-12T12:15:09.908Z', "Type": 356, "Name": 16.0, "UID": 49, "Advisor": 3.9, "Last Updated By": "-" },
    { id: 6, date: '2024-02-12T12:15:09.908Z', "Type": 408, "Name": 3.2, "UID": 87, "Advisor": 6.5, "Last Updated By": "-" },
    { id: 7, date: '2024-02-12T12:15:09.908Z', "Type": 237, "Name": 9.0, "UID": 37, "Advisor": 4.3, "Last Updated By": "-" },
    { id: 8, date: '2024-02-08T12:15:09.908Z', "Type": 375, "Name": 0.0, "UID": 94, "Advisor": 0.0, "Last Updated By": "-" },
    { id: 9, date: '2024-02-12T12:15:09.908Z', "Type": 518, "Name": 26.0, "UID": 65, "Advisor": 7.0, "Last Updated By": "-" },
    { id: 10, date: '2024-02-12T12:15:09.908Z', "Type": 392, "Name": 0.2, "UID": 98, "Advisor": 0.0, "Last Updated By": "-" },
    { id: 11, date: '2024-02-12T12:15:09.908Z', "Type": 318, "Name": 0.0, "UID": 81, "Advisor": 2.0, "Last Updated By": "-" },
    { id: 12, date: '2024-02-02T19:14:09.908Z', "Type": 360, "Name": 19.0, "UID": 9, "Advisor": 37.0, "Last Updated By": "-" },
    { id: 13, date: '2024-02-12T12:15:09.908Z', "Type": 437, "Name": 18.0, "UID": 63, "Advisor": 4.0, "Last Updated By": "-" },
  ];

  $: sortedData = [...data].sort($order.handler);

  const filterOptions = [
    { name: 'Owner', value: "owner" },
    { name: 'Completed', value: "completed" }
  ];

  let currentFilters: string[] = [];
</script>

<div class="p-2">
  <div class="flex justify-between items-center">
    <h1 class="text-2xl">Appointments</h1>
    <div class="flex gap-2">
      <span>
        <ToggleButton let:on={open} let:toggleOff transition={false} class="text-md">
          Filters ({currentFilters.length})
          <MultiSelectMenu
            value={currentFilters}
            options={filterOptions}
            on:change={(e) => {
              currentFilters = e.detail.selection.selected
            }}
            {open}
            on:close={toggleOff}
            classes={{ menu: "w-[360px]" }}
          >
            <svelte:fragment slot="actions">
              <Button on:click={() => {
                currentFilters = []
              }}>Reset</Button>
            </svelte:fragment>
            <svelte:fragment slot="beforeOptions">
              <TextField clearable autofocus placeholder="Search..." />
            </svelte:fragment>
          </MultiSelectMenu>
        </ToggleButton>
      </span>
      <i class="fa-solid fa-circle-plus text-2xl text-accSlate hover:scale-125 duration-100 cursor-pointer mt-1"></i>
    </div>
  </div>
  <hr class="my-4">
</div>


<Paginate items={sortedData} perPage={25} let:pageItems let:pagination>
  <Table
    classes={{ thead: 'text-lg', th: "p-2", td: "px-2 py-2", tr: "hover:bg-accSlate/5 rounded-md cursor-pointer", table: "rounded-md" }}
    data={pageItems}
    columns={[
      {
        header: "Date & Time",
        name: "date",
        align: "left",
        format: (value) => moment(value).format('MMM Do [at] h:m A')
      },
      {
        name: "Type",
        align: "left",
        format: "integer",
      },
      {
        name: "Name",
        align: "left",
        format: "integer",
      },
      {
        name: "UID",
        align: "left",
        format: "integer",
      },
      {
        name: "Advisor",
        align: "left",
        format: "integer",
      },
      {
        name: "Last Updated By",
        align: "left",
      },
    ]}
    orderBy={$order.by}
    orderDirection={$order.direction}
    on:headerClick={(e) => {
      if (e.detail.column.orderBy !== false) {
        order.onHeaderClick(e.detail.column);
      }
    }}
    on:cellClick={(e) => {
      console.log(e.detail.rowData.id);
    }}
  />
  <Pagination
    {pagination}
    perPageOptions={[5, 10, 25, 100]}
    show={["perPage", "pagination", "prevPage", "nextPage"]}
    classes={{
      root: "border-t py-1 mt-2",
      perPage: "flex-1 text-right",
      pagination: "px-8",
    }}
  />
</Paginate>