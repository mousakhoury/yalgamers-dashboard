<script>
  import Youtube from "$lib/assets/images/dashboard/lesson-youtube.svg";
  import Link from "$lib/assets/images/dashboard/lesson-link.svg";
  import AddCircle from "$lib/assets/images/dashboard/add-circle.svg";

  let lessons = [{ id: 1, link: "" }];

  // Add a new lesson input field
  const addNewLesson = () => {
    lessons = [...lessons, { id: lessons.length + 1, link: "" }];
  };

  // Remove a specific lesson input field
  const removeLesson = (id) => {
    lessons = lessons.filter((lesson) => lesson.id !== id);
  };

  // Update the input value for a specific lesson
  const updateLesson = (id, value) => {
    lessons = lessons.map((lesson) => (lesson.id === id ? { ...lesson, link: value } : lesson));
  };
</script>

<div class="flex flex-col items-start gap-[16px] w-full">
  {#each lessons as { id, link }, index}
    <!-- Include index as the second argument -->
    <div class="flex flex-col items-start gap-[8px] w-full">
      <label for="lesson-{id}" class="text-[#533E59] text-[12px] font-semibold">
        Lesson {index + 1}
        <!-- Add 1 to index to start from 1 instead of 0 -->
        <span class="text-[#F71756]">*</span>
      </label>
      <div class="flex items-center gap-[10px] w-full border border-[#E9E6EA] rounded-[4px]">
        <input id="lesson-{id}" type="text" placeholder="Enter YouTube Link..." bind:value={link} on:input={(e) => updateLesson(id, e.target.value)} class="w-full border-0 outline-none shadow-transparent text-[14px] p-[14px]" />
        <div class="flex items-center gap-[8px] pr-[16px]">
          {#if lessons.length > 1}
            <button on:click={() => removeLesson(id)} class="w-[14px] h-[14px] text-[10px]" title="Remove"> ❌ </button>
          {/if}
          <img src={Youtube} alt="" class="w-[14px]" />
          <img src={Link} alt="" class="w-[14px]" />
        </div>
      </div>
    </div>
  {/each}
  <button on:click={addNewLesson} class="flex items-center justify-center gap-[8px] rounded-[4px] p-[11px] w-full bg-[#1FD03126] hover:bg-[#1FD0314D]">
    <img src={AddCircle} alt="" class="w-[14px]" /> <p class="text-[#1FD031] text-[14px] font-medium">Add New Lesson</p>
  </button>
</div>
