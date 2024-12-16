<script>
  import { createEventDispatcher } from "svelte";
  import Pagination from "./Pagination.svelte";
  import Delete from "$lib/assets/images/datatable/delete.svg";
  import Edit from "$lib/assets/images/datatable/edit.svg";
  import Pause from "$lib/assets/images/datatable/pause.svg";
  import Play from "$lib/assets/images/datatable/play.svg";

  export let columns = [];
  export let data = [];
  export let totalResults = 0;
  export let resultsPerPage = 8;
  export let currentPage = 1;
  export let selectedTab = "";
  export let isGeners = false;

  const dispatch = createEventDispatcher();

  // Helper function to format the creationDate
  function formatDate(date) {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  }

  function editItem(row) {
    dispatch("edit", row);
  }

  function changePage(page) {
    dispatch("pageChange", { page });
  }

  $: paginatedData = data.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage);
</script>

<div class="flex flex-col items-end gap-[10px] w-full">
  <div class="overflow-x-auto w-full">
    <table class="min-w-full bg-white shadow-md overflow-hidden">
      <thead>
        <tr>
          {#each columns as column}
            <th class="px-4 py-3 text-left text-[12px] font-normal text-[#948798] border-b border-[#2a0d321a] bg-[#2a0d3208]">
              {column.label}
            </th>
          {/each}
          {#if selectedTab !== "Deleted"}
            <th class="px-[20px] py-[9px] text-left text-[12px] font-normal text-[#948798] border-b border-[#2a0d321a] bg-[#2a0d3208]">Actions</th>
          {/if}
        </tr>
      </thead>
      <tbody>
        {#each paginatedData as row}
          <tr class="border-b border-[#2a0d320f]">
            {#each columns as column}
              <td class="px-[20px] py-[9px] text-[12px] text-[#533E59] font-medium">
                {#if column.key === "photo"}
                  <img src={row[column.key]} alt="" class="w-[28px] h-[28px] rounded-[4px]" />
                {:else if column.key === "status"}
                  <span class="px-[6px] py-[4px] text-[10px] font-normal rounded-full" class:published={row[column.key] === "Published"} class:paused={row[column.key] === "Paused"} class:deleted={row[column.key] === "Deleted"}>
                    {row[column.key]}
                  </span>
                {:else if column.key === "creationDate" || column.key === "launchedOn"}
                  {formatDate(row[column.key])}
                {:else}
                  {row[column.key]}
                {/if}
              </td>
            {/each}
            {#if selectedTab !== "Deleted"}
              <td class="px-[20px] py-[9px]">
                <div class="flex items-center gap-[8px]">
                  {#if !isGeners}
                    {#if selectedTab === "Published"}
                      <button class="p-[4px] rounded-[3px] hover:bg-[#DBC40526]">
                        <img src={Pause} alt="" class="w-[16px]" />
                      </button>
                    {:else}
                      <button class="p-[4px] rounded-[3px] hover:bg-[#1FD03126]">
                        <img src={Play} alt="" class="w-[16px]" />
                      </button>
                    {/if}
                  {/if}

                  <button class="p-[4px] rounded-[3px] hover:bg-[#F7175626]"><img src={Delete} alt="" class="w-[16px]" /></button>
                  <button on:click={() => editItem(row)} class="p-[4px] rounded-[3px] hover:bg-[#1B17EC26]">
                    <img src={Edit} alt="" class="w-[16px]" />
                  </button>
                </div>
              </td>
            {/if}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="flex items-center justify-between w-full px-[20px] pb-[12px]">
    <p class="text-[#A99FAC] text-[12px] font-normal">Total Result: {totalResults}</p>
    <!-- Pagination Component -->
    <Pagination {totalResults} {resultsPerPage} {currentPage} on:pageChange={(event) => changePage(event.detail.page)} />
  </div>
</div>

<style>
  .published {
    background-color: #1fd031;
    color: #052108;
  }
  .paused {
    background-color: #edd824;
    color: #1d1a04;
  }
  .deleted {
    background-color: #f71756;
    color: #22040c;
  }
</style>
