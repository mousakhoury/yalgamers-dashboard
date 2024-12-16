<script>
  import { createEventDispatcher } from "svelte";
  import Dots from "$lib/assets/images/datatable/four-dots.svg";

  export let totalResults = 0;
  export let resultsPerPage = 10;
  export let currentPage = 1;

  const dispatch = createEventDispatcher();

  // Make totalPages reactive so it updates when totalResults or resultsPerPage change
  $: totalPages = Math.ceil(totalResults / resultsPerPage);

  function setPage(page) {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
      dispatch("pageChange", { page });
    }
  }

  function generatePageNumbers() {
    let pages = [];

    if (totalPages <= 5) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      pages = [1];

      if (currentPage > 3) pages.push("...");

      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  }
</script>

<nav class="flex items-center gap-[20px]">
  <div>
    <button on:click={() => setPage(1)} class="pagination-button" disabled={currentPage === 1}> « </button>
    <button on:click={() => setPage(currentPage - 1)} class="pagination-button" disabled={currentPage === 1}> ‹ </button>
  </div>

  <div class="flex items-center gap-[10px]">
    {#each generatePageNumbers() as page}
      {#if page === "..."}
        <div class="dots">
          <img src={Dots} alt="" />
        </div>
      {:else}
        <button on:click={() => setPage(page)} class="pagination-button {page === currentPage ? 'active' : ''}">
          {String(page).padStart(2, "0")}
        </button>
      {/if}
    {/each}
  </div>

  <div>
    <button on:click={() => setPage(currentPage + 1)} class="pagination-button" disabled={currentPage === totalPages}> › </button>
    <button on:click={() => setPage(totalPages)} class="pagination-button" disabled={currentPage === totalPages}> » </button>
  </div>
</nav>

<style>
  .pagination-button {
    padding: 5px;
    border: none;
    border-radius: 4px;
    color: #68566e;
    font-size: 12px;
    font-weight: 400;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .pagination-button:hover {
    background-color: #e2e8f0;
  }
  .pagination-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .pagination-button.active {
    background-color: #bc5ad7;
    color: white;
  }
  .dots {
    color: #d4cfd6;
    display: block;
  }
</style>
