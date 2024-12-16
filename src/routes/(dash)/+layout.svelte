<script>
  import "../../app.css";
  import SideBar from "$components/SideBar/SideBar.svelte";
  import Header from "$components/Header/Header.svelte";
</script>

<div class="flex items-start relative z-50">
  <SideBar />
  <div class="flex flex-col items-start w-full">
    <Header />
    <div class="flex flex-col gap-[24px] p-[24px] w-full">
      <slot />
    </div>
  </div>
</div>
