<script>
  import Upload from "$lib/assets/images/dashboard/upload.svg";
  import Zip from "$lib/assets/images/dashboard/zip.svg";
  import Uploaded from "$lib/assets/images/dashboard/tick-double.svg";

  import { writable } from "svelte/store";

  export let file = null;
  let uploadState = writable("idle"); // idle, uploading, uploaded
  let isDragging = writable(false); // State for drag-and-drop hover
  let uploadPercentage = writable(0); // Tracks the uploading percentage

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      startUpload(selectedFile);
    }
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      startUpload(droppedFile);
    }
    isDragging.set(false);
  }

  function startUpload(selectedFile) {
    file = selectedFile;
    uploadState.set("uploading");
    uploadPercentage.set(0); // Reset percentage

    // Simulate file upload process
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10; // Increase progress by 10% every 200ms
      uploadPercentage.set(progress);

      if (progress >= 100) {
        clearInterval(interval);
        uploadState.set("uploaded");
      }
    }, 200); // Replace with your actual upload logic and progress calculation
  }

  function resetUpload() {
    file = null;
    uploadState.set("idle");
    uploadPercentage.set(0); // Reset percentage
  }
</script>

<div role="region" aria-label="Drag and drop upload zone" class="p-[12px] rounded-[8px] border border-dashed border-[#CD0DB9] w-full" on:dragover|preventDefault={() => isDragging.set(true)} on:dragleave={() => isDragging.set(false)} on:drop={handleDrop}>
  <div class="flex items-center justify-center w-full h-[256px] rounded-[6px] bg-[#FAE7F8] overflow-hidden relative">
    {#if $uploadState === "uploaded"}
      <div class="flex flex-col items-center gap-[28px] max-w-[239px] {$isDragging || $uploadState === 'uploading' ? 'opacity-20' : ''}">
        <div class="flex flex-col items-center gap-[24px]">
          <img src={Uploaded} alt="" class="w-[40px]" />
          <div class="flex flex-col items-center gap-[8px]">
            <p class="text-[#3D2644] text-[20px] font-bold">Uploaded</p>
            <div class="flex items-center gap-[6px]">
              <img src={Zip} alt="" class="w-[14px]" />
              <p class="text-[#533E59] text-[12px] text-center font-medium">{file?.name}</p>
            </div>
          </div>
        </div>

        <button on:click={resetUpload} class="flex items-center gap-[10px] px-[18px] py-[10px] rounded-[4px] bg-[#CD0DB9] hover:bg-[#a40a94] cursor-pointer">
          <img src={Upload} alt="" class="w-[16px]" />
          <p class="text-white text-[12px] font-semibold">Upload Again</p>
        </button>
      </div>
    {:else}
      <div class="flex flex-col items-center gap-[28px] max-w-[239px] {$isDragging || $uploadState === 'uploading' ? 'opacity-20' : ''}">
        <div class="flex flex-col items-center gap-[24px]">
          <img src={Zip} alt="" class="w-[40px]" />
          <div class="flex flex-col items-center gap-[8px]">
            <p class="text-[#3D2644] text-[20px] font-bold">Upload ZIP File</p>
            <p class="text-[#7E6E83] text-[12px] text-center font-medium">Upload or drag and drop the main ZIP file which contains the game itself.</p>
          </div>
        </div>
        <input type="file" id="file-upload" accept=".zip" class="hidden" on:change={handleFileChange} />
        <label for="file-upload" class="flex items-center gap-[10px] px-[18px] py-[10px] rounded-[4px] bg-[#CD0DB9] hover:bg-[#a40a94] cursor-pointer">
          <img src={Upload} alt="" class="w-[16px]" />
          <p class="text-white text-[12px] font-semibold">Upload</p>
        </label>
      </div>
    {/if}

    {#if $isDragging}
      <div class="flex items-center justify-center absolute top-0 left-0 w-full h-full">
        <p class="text-[#3D2644] text-[20px] font-bold">Drop Here</p>
      </div>
    {/if}

    {#if $uploadState === "uploading"}
      <div class="flex items-center justify-center absolute top-0 left-0 h-full bg-[#CD0DB966]" style="width: {$uploadPercentage}%"></div>
      <div class="flex items-center justify-center absolute top-0 left-0 w-full h-full">
        <p class="text-[#CD0DB9] text-[20px] font-bold">Uploading... {$uploadPercentage}%</p>
      </div>
    {/if}
  </div>
</div>
