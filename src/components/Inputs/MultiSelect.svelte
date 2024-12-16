<script>
  import { onMount } from "svelte";
  let SvelteSelect;
  let isClient = false;

  onMount(async () => {
    isClient = true;
    const module = await import("svelte-select");
    SvelteSelect = module.default;
  });

  export let label = "";
  export let placeholder = "";
  export let required = false;
  export let items = [];
  export let selectedOptions = [];
</script>

<div class="flex flex-col items-start gap-[8px] w-full">
  <label for={label} class="text-[#533E59] text-[12px] font-semibold">
    {label}
    {#if required}
      <span class="text-[#F71756]">*</span>
    {/if}
  </label>
  {#if isClient && SvelteSelect}
    <SvelteSelect {items} bind:value={selectedOptions} {placeholder} multiple clearable />
  {/if}
</div>

<style>
  :global(.svelte-select.multi) {
    height: 46.4px;
    border: 1px solid #e9e6ea;
    border-radius: 4px;
  }

  :global(.svelte-select.multi .value-container) {
    padding: 0;
  }
</style>
