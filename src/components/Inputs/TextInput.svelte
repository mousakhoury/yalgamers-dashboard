<script>
  export let label = "";
  export let placeholder = "";
  export let value = "";
  export let required = false;
</script>

<div class="flex flex-col items-start gap-[8px] w-full">
  <label for={label} class="text-[#533E59] text-[12px] font-semibold"
    >{label}
    {#if required}
      <span class="text-[#F71756]">*</span>
    {/if}
  </label>
  <input type="text" name={label} {placeholder} bind:value class="bg-white rounded-[4px] border border-[#E9E6EA] w-full p-[14px] text-[14px]" />
</div>
