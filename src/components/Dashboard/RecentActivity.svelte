<script>
  $: activities = [
    {
      text: "Mousa Kho.. just made a support ticket.",
    },
    {
      text: "Tarek commented on tutorial.",
    },
    {
      text: "Mousa Kho.. just made a support ticket.",
    },
    {
      text: "Tarek commented on tutorial.",
    },
    {
      text: "Mousa Kho.. just made a support ticket.",
    },
    {
      text: "Tarek commented on tutorial.",
    },
    {
      text: "Mousa Kho.. just made a support ticket.",
    },
    {
      text: "Tarek commented on tutorial.",
    },
  ];
</script>

<div class="flex flex-col items-center gap-[20px] p-[20px] pb-[16.55px] pr-[4px] rounded-[6px] bg-white w-full overflow-hidden relative">
  <p class="text-[#3D2644] text-[16px] font-semibold w-full">Recent Activity</p>

  <div class="flex flex-col items-start gap-[10px] w-full h-[143px] overflow-auto pr-[12px]">
    {#each activities as activity}
      <div class="flex items-center gap-[14px] px-[14px] py-[13px] h-[41px] rounded-[4px] bg-[#F5F4F5] w-full shrink-0">
        <span class="block w-[8px] h-[8px] rounded-full bg-[#5BE01C]"></span>
        <p class="text-[#533E59] text-[12px] font-medium">{activity.text}</p>
      </div>
    {/each}
  </div>
  <div class="w-full h-[50px] absolute left-0 bottom-0 bg-gradient"></div>
</div>

<style>
  .overflow-auto::-webkit-scrollbar-track {
    background: #fff;
  }

  .overflow-auto::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  .overflow-auto::-webkit-scrollbar-thumb {
    background: #f5f4f5;
    border-radius: 100px;
  }

  .bg-gradient {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 74.5%);
  }
</style>
