<script>
  import { onMount, afterUpdate } from "svelte";
  import { createEventDispatcher } from "svelte";

  export let content = "";
  export let label = "";
  export let placeholder = "";
  export let required = false;

  const dispatch = createEventDispatcher();
  let editorElement;

  function updateContent(newContent) {
    content = newContent;
    dispatch("update", { content });
  }

  onMount(() => {
    tinymce.init({
      target: editorElement,
      plugins: ["print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen", "link image media table code lists textcolor"],
      toolbar: ["undo redo | formatselect | bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | link image"],
      setup: function (editor) {
        editor.on("init", () => {
          editor.setContent(content);
        });
        editor.on("change", () => {
          updateContent(editor.getContent());
        });
        editor.on("keyup", () => {
          updateContent(editor.getContent());
        });
      },
    });

    return () => {
      tinymce.remove();
    };
  });

  afterUpdate(() => {
    if (tinymce.get(editorElement.id)) {
      tinymce.get(editorElement.id).setContent(content);
    }
  });
</script>

<div class="flex flex-col items-start gap-[8px] w-full">
  <label for={label} class="text-[#533E59] text-[12px] font-semibold">
    {label}
    {#if required}
      <span class="text-[#F71756]">*</span>
    {/if}
  </label>
  <textarea id="editor" bind:this={editorElement} {placeholder} class="w-full"></textarea>
</div>

<style>
  :global(.tox.tox-tinymce) {
    width: 100%;
    border-radius: 4px;
    border: 1px solid #e9e6ea;
    font-size: 14px;
  }
</style>
