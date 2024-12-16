<script>
  import { createEventDispatcher } from "svelte";

  export let tabs = []; // array of tab names like ["Active", "Paused", "Removed"]
  export let selectedTab = ""; // default selected tab

  const dispatch = createEventDispatcher();

  function selectTab(tab) {
    selectedTab = tab;
    dispatch("tabSelect", { tab });
  }
</script>

<div class="flex items-center gap-[10px]">
  {#each tabs as tab}
    <button on:click={() => selectTab(tab.type)} class="tab-button {selectedTab === tab.type ? 'active' : ''}">
      {tab.title}
    </button>
  {/each}
</div>

<style>
  .tab-button {
    padding: 6px 10px;
    font-weight: 500;
    color: #7e6e83;
    font-size: 12px;
    background-color: transparent;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  .tab-button:hover {
    background-color: #4048f926;
  }
  .tab-button.active {
    background: #4048f926;
    color: #4048f9;
  }
</style>
