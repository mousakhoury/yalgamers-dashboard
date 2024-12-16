<script>
  import Upload from "$lib/assets/images/dashboard/upload.svg";
  import Placeholder from "$lib/assets/images/dashboard/image-placeholder.svg";
  import { createEventDispatcher } from "svelte";

  export let label = "";
  export let ratio = "1"; // default aspect ratio value
  export let required = false;

  export let selectedFiles = [];
  const dispatcher = createEventDispatcher();

  // Handle file selection for multiple files
  function handleFileChange(event) {
    const files = Array.from(event.target.files);
    const newFiles = files.map((file) => ({
      url: URL.createObjectURL(file),
      file: file,
    }));
    selectedFiles = [...selectedFiles, ...newFiles];
    newFiles.forEach(({ file }) => dispatcher("fileUploaded", { file }));
  }

  function triggerUpload() {
    document.getElementById("file-input").click();
  }

  function deleteImage(index) {
    selectedFiles = selectedFiles.filter((_, i) => i !== index);
  }
</script>

<div class="flex flex-col items-start gap-[8px] w-full">
  <label for={label} class="text-[#533E59] text-[12px] font-semibold">
    {label}
    {#if required}
      <span class="text-[#F71756]">*</span>
    {/if}
  </label>

  <div class="flex flex-wrap items-center gap-4">
    <!-- Placeholder Image when there are no uploaded images -->
    {#if selectedFiles.length === 0}
      <div class="w-[50px] rounded-[3px] flex items-center justify-center overflow-hidden" style="aspect-ratio: {ratio};">
        <img src={Placeholder} alt="" class="object-cover w-full h-full" />
      </div>
      <div class="w-[50px] rounded-[3px] flex items-center justify-center overflow-hidden" style="aspect-ratio: {ratio};">
        <img src={Placeholder} alt="" class="object-cover w-full h-full" />
      </div>
    {/if}

    <!-- Image Previews -->
    {#each selectedFiles as file, index}
      <div class="relative group">
        <div class="w-[50px] rounded-[3px] flex items-center justify-center overflow-hidden" style="aspect-ratio: {ratio};">
          <img src={file.url} alt="" class="object-cover w-full h-full" />
        </div>
        <!-- Delete Button -->
        <button type="button" on:click={() => deleteImage(index)} class="flex items-center justify-center absolute top-[-10px] right-[-10px] w-[24px] h-[24px] bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"> &times; </button>
      </div>
    {/each}

    <!-- Upload Button -->
    <div class="flex flex-col items-start gap-3">
      <!-- Required Size Note -->
      <p class="text-[#BEB6C0] text-xs font-normal">*Required Size 300px X 400px</p>

      <button type="button" class="flex items-center gap-[10px] px-[18px] py-[10px] rounded-[4px] bg-[#1B17EC] hover:bg-[#4945f0]" on:click={triggerUpload}>
        <img src={Upload} alt="" class="w-[16px]" />
        <p class="text-white text-[12px] font-semibold">Upload</p>
      </button>
    </div>

    <!-- Hidden File Input -->
    <input id="file-input" type="file" accept="image/*" multiple class="hidden" on:change={handleFileChange} />
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
