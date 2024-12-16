<script>
  export let infos;
</script>

<div class="flex items-center gap-[21px] w-full">
  {#each infos as info}
    <div class="flex items-center gap-[16px] p-[12px] w-full bg-white rounded-[6px]">
      <img src={info.icon} alt="" class="w-[60px]" />
      <div class="flex flex-col items-start gap-[6px]">
        <p class="text-[#7E6E83] text-[12px] font-medium">{info.title}</p>
        <p class="text-[#3D2644] text-[24px] font-semibold">{info.data}</p>
      </div>
    </div>
  {/each}
</div>
