<script>
  import Link from "$lib/assets/images/dashboard/lesson-link.svg";
  export let label = "";
  export let placeholder = "";
  export let value = "";
  export let required = false;
  export let icon = "";
</script>

<div class="flex flex-col items-start gap-[8px] w-full">
  <label for={label} class="text-[#533E59] text-[12px] font-semibold"
    >{label}
    {#if required}
      <span class="text-[#F71756]">*</span>
    {/if}
  </label>

  <div class="flex items-center w-full border border-[#E9E6EA] rounded-[4px]">
    <div class="p-[13px] border-r border-[#E9E6EA] h-full">
      <img src={icon} alt="" class="w-[20px]" />
    </div>
    <input type="text" name={label} {placeholder} bind:value class="w-full border-0 outline-none shadow-transparent text-[14px] p-[14px]" />
    <div class="flex items-center gap-[8px] pr-[16px]">
      <img src={Link} alt="" class="w-[14px]" />
    </div>
  </div>
</div>
