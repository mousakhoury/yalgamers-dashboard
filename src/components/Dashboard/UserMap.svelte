<script>
  import Globe from "$lib/assets/images/dashboard/globe.svg";
  import Saudi from "$lib/assets/images/dashboard/saudi.png";
  import Morocco from "$lib/assets/images/dashboard/morocco.png";

  $: locations = [
    {
      name: "Saudi Arabia",
      users: 24092,
      image: Saudi,
    },
    {
      name: "Morocco",
      users: 20115,
      image: Morocco,
    },
  ];
</script>

<div class="flex flex-col items-center gap-[20px] p-[20px] rounded-[6px] bg-white w-full">
  <p class="text-[#3D2644] text-[16px] font-semibold w-full">Most Users</p>
  <div class="relative">
    <img src={Globe} alt="" class="w-[285.769px]" />
  </div>
  <div class="flex items-center justify-between w-[280px]">
    {#each locations as location}
      <div class="flex items-center justify-center gap-[10px] w-[124px]">
        <img src={location.image} alt="" class="w-[28px]" />
        <div class="flex flex-col items-start gap-[4px]">
          <p class="text-[#948798] text-[12px] font-normal">{location.name}</p>
          <p class="text-[#533E59] text-[14px] font-semibold">{location.users}</p>
        </div>
      </div>
    {/each}
  </div>
</div>
