<script>
  import DropDown from "$lib/assets/images/dashboard/arrow-down-01.svg";
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  export let label = "";
  export let options = [];
  export let value = "";
  export let required = false;

  let isOpen = false;
  const dispatch = createEventDispatcher();

  function toggleDropdown() {
    isOpen = !isOpen;
  }

  function selectOption(option) {
    value = option;
    isOpen = false;
    dispatch("change", { value });
  }

  function handleClickOutside(event) {
    if (!event.target.closest(".dropdown-container")) {
      isOpen = false;
    }
  }

  // Close dropdown when clicking outside
  onMount(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });
</script>

<div class="dropdown-container flex flex-col items-start gap-2 w-full relative">
  <p for={label} class="text-[#533E59] text-sm font-semibold">
    {label}
    {#if required}
      <span class="text-red-500">*</span>
    {/if}
  </p>
  <div class="relative w-full">
    <button class="dropdown-trigger flex items-center justify-between px-4 py-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring focus:ring-indigo-200" on:click={toggleDropdown}>
      {#if value}
        <span class="text-base font-normal text-gray-700">{value}</span>
      {:else}
        <span class="text-base font-normal text-gray-400">{label}</span>
      {/if}
      <img src={DropDown} alt="" class="w-4 transform {isOpen ? 'rotate-180' : ''}" />
    </button>
    {#if isOpen}
      <div class="dropdown-menu flex flex-col items-start absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-[300px] overflow-auto">
        {#each options as option}
          <button class="flex items-start px-4 py-2 w-full text-left hover:bg-indigo-100 cursor-pointer" on:click={() => selectOption(option)}>
            {option}
          </button>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .dropdown-container {
    width: 100%;
  }
</style>
