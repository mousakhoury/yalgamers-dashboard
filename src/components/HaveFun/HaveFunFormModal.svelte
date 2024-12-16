<script>
  import Website from "$lib/assets/images/links-icons/website.svg";
  import Twitter from "$lib/assets/images/links-icons/twitter.svg";
  import Telegram from "$lib/assets/images/links-icons/telegram.svg";
  import Discord from "$lib/assets/images/links-icons/discord.svg";

  import LessonsInputs from "$components/Inputs/LessonsInputs.svelte";
  import LinksInputs from "$components/Inputs/LinksInputs.svelte";
  import SelectOption from "$components/Inputs/SelectOption.svelte";
  import TextAria from "$components/Inputs/TextAria.svelte";
  import TextInput from "$components/Inputs/TextInput.svelte";
  import UploadImage from "$components/Inputs/UploadImage.svelte";
  import { createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";
  import FileUpload from "$components/Inputs/FileUpload.svelte";

  export let title = ""; // Title of the form (e.g., "Add New Tutorial" or "Edit Tutorial")
  export let formData = {}; // Object with initial form data for editing
  export let submitLabel = "Submit"; // Label for the submit button

  const dispatch = createEventDispatcher();

  function handleSubmit() {
    dispatch("submit", formData);
  }

  function handleClose() {
    dispatch("close");
  }
</script>

<div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-end z-50">
  <!-- Modal content wrapper -->
  <div class="flex flex-col items-start justify-between w-full max-w-[728px] h-screen bg-white" in:fly={{ x: 300, duration: 300 }} out:fly={{ x: 300, duration: 300 }}>
    <!-- Modal title -->
    <div class="pt-[30px] pb-[20px] px-[24px] w-full border-b border-[#2A0D321A] title-box-shadow">
      <h2 class="text-xl font-semibold mb-4">{title}</h2>
    </div>

    <!-- Form fields -->
    <div class="flex flex-col items-start gap-[24px] p-[24px] w-full h-full overflow-auto">
      <h5 class="text-[#533E59] text-[16px] font-semibold">Game Details</h5>
      <div class="flex flex-col items-start gap-[16px] w-full">
        <TextInput label="name" placeholder="Enter Name..." bind:value={formData.name} required={true} />

        <TextInput label="Subheading" placeholder="Enter Subheading..." bind:value={formData.subheading} required={true} />

        <TextAria label="Description" placeholder="Enter Description" bind:content={formData.description} required={true} />
      </div>

      <hr />

      <h5 class="text-[#533E59] text-[16px] font-semibold">Weekly Leaderboard Topper Reward</h5>
      <div class="flex flex-col items-start gap-[16px] w-full">
        <TextInput label="XP" placeholder="Enter XP..." bind:value={formData.xp} required={true} />
      </div>

      <hr />

      <h5 class="text-[#533E59] text-[16px] font-semibold">Images</h5>

      <div class="flex flex-col items-start gap-[16px] w-full">
        <UploadImage label="Logo" ratio="300/400" bind:selectedFile={formData.logo} required={true} />
        <UploadImage label="Cover Photo" ratio="300/400" bind:selectedFile={formData.coverPhoto} required={true} />
      </div>

      <hr />
      <FileUpload bind:file={formData.zipFile} />
    </div>

    <!-- Action buttons -->
    <div class="flex items-center justify-center gap-[20px] px-[24px] py-[20px] border-t border-[#2A0D321A] bottom-box-shadow w-full">
      <button on:click={handleClose} class="w-full h-[46px] pt-[15px] py-[14px] rounded-[6px] bg-[#2A0D3212] hover:bg-[#351b3c32]">
        <p class="text-[#2A0D32] text-[14px] font-semibold">Cancel</p>
      </button>
      <button on:click={handleSubmit} class="w-full h-[46px] pt-[15px] py-[14px] rounded-[6px] bg-[#1B17EC] hover:bg-[#4945f0]">
        <p class="text-white text-[14px] font-semibold">{submitLabel}</p>
      </button>
    </div>
  </div>
</div>

<style>
  /* Ensures full-screen overlay behind the modal */
  .fixed {
    position: fixed;
  }

  .title-box-shadow {
    box-shadow: 0px 2px 20px 0px rgba(42, 13, 50, 0.06);
  }

  .bottom-box-shadow {
    box-shadow: 0px -2px 20px 0px rgba(42, 13, 50, 0.06);
  }

  hr {
    width: 100%;
    border-color: #e9e6ea;
  }
</style>
