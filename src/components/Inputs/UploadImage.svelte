<script>
  import Upload from "$lib/assets/images/dashboard/upload.svg";
  import Placeholder from "$lib/assets/images/dashboard/image-placeholder.svg";
  import { createEventDispatcher } from "svelte";

  // Props
  export let label = "";
  export let ratio = "";
  export let required = false;
  export let selectedFile = null;

  // Event dispatcher to emit file upload event
  const dispatcher = createEventDispatcher();

  // Handle file selection
  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      selectedFile = URL.createObjectURL(file);
      dispatcher("fileUploaded", { file });
    }
  }

  function triggerUpload() {
    document.getElementById(label + "-file-input").click();
  }

  function deleteImage() {
    selectedFile = null;
    dispatcher("fileDeleted");
  }
</script>

<div class="flex flex-col items-start gap-[8px] w-full">
  <label for={label} class="text-[#533E59] text-[12px] font-semibold">
    {label}
    {#if required}
      <span class="text-[#F71756]">*</span>
    {/if}
  </label>
  <div class="flex items-center gap-[20px]">
    <!-- Image Preview Container with Delete Button -->
    <div class="relative group w-[50px] rounded-[3px] flex items-center justify-center" style="aspect-ratio: {ratio};">
      {#if selectedFile}
        <img src={selectedFile} alt="" class="object-cover w-full h-full rounded-[3px]" />
        <!-- Delete Button -->
        <button type="button" on:click={deleteImage} class="flex items-center justify-center absolute top-[-10px] right-[-10px] w-[24px] h-[24px] bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"> &times; </button>
      {:else}
        <img src={Placeholder} alt="" class="object-cover w-full h-full rounded-[3px]" />
      {/if}
    </div>

    <div class="flex flex-col items-start gap-[12px]">
      <!-- Required Size Note -->
      <p class="text-[#BEB6C0] text-[12px] font-normal">*Required Size 300px X 400px</p>

      <!-- Upload Button -->
      <button type="button" class="flex items-center gap-[10px] px-[18px] py-[10px] rounded-[4px] bg-[#1B17EC] hover:bg-[#4945f0]" on:click={triggerUpload}>
        <img src={Upload} alt="" class="w-[16px]" />
        <p class="text-white text-[12px] font-semibold">Upload</p>
      </button>
    </div>

    <!-- Hidden File Input -->
    <input id={label + "-file-input"} type="file" accept="image/*" class="hidden" on:change={handleFileChange} />
  </div>
</div>

<style>
  .group:hover .delete-button {
    opacity: 1;
  }

  .delete-button {
    transition: opacity 0.2s ease-in-out;
  }
</style>
