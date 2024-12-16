<script>
  import GamesDataTable from "$components/DataTable/GamesDataTable.svelte";
  import Tabs from "$components/DataTable/Tabs.svelte";
  import Placeholder from "$lib/assets/images/datatable/placeholder.png";
  import AddButton from "$lib/assets/images/datatable/add-square.svg";
  import GenersFormModal from "$components/Geners/GenersFormModal.svelte";

  export let columns = [
    { label: "#", key: "id" },
    { label: "Photo", key: "photo" },
    { label: "Title", key: "title" },
    { label: "Created by", key: "createdBy" },
    { label: "Status", key: "status" },
    { label: "Creation Date", key: "creationDate" },
  ];

  let data = Array.from({ length: 50 }, (_, index) => ({
    id: (index + 1).toString().padStart(2, "0"),
    photo: Placeholder,
    title: "Multiplayer",
    createdBy: "Ali Haniyah",
    status: index % 3 === 0 ? "Published" : "Deleted",
    creationDate: new Date(2024, 0, 12 - index),
  }));

  let selectedTab = "Published";
  let selectedItem = null;
  let isModalOpen = false;
  let modalMode = "add";
  let currentPage = 1;
  let resultsPerPage = 8;

  const tabs = [
    { title: "Active Genres", type: "Published" },
    { title: "Removed Genres", type: "Deleted" },
  ];

  // Update tabTitle reactively based on selectedTab
  $: tabTitle = tabs.find((tab) => tab.type === selectedTab)?.title || "News";

  // Filter and sort data based on selected tab, sorted by newest creationDate
  $: filteredData = data.filter((item) => item.status === selectedTab).sort((a, b) => b.creationDate - a.creationDate);

  // Recalculate totalResults and totalPages whenever filteredData changes
  $: totalResults = filteredData.length;
  $: totalPages = Math.ceil(totalResults / resultsPerPage);

  // Reset current page to 1 whenever the selected tab changes to avoid empty pages
  $: if (selectedTab) {
    currentPage = 1;
  }

  function openAddModal() {
    selectedItem = { title: "", description: "", createdBy: "", cardImage: "", sliderImage: "", status: "Published" };
    modalMode = "add";
    isModalOpen = true;
  }

  function openEditModal(item) {
    selectedItem = { ...item };
    modalMode = "edit";
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
  }

  function handleFormSubmit(event) {
    const newItem = event.detail;
    const creationDate = new Date();

    if (modalMode === "add") {
      data = [...data, { id: (data.length + 1).toString().padStart(2, "0"), ...newItem, photo: Placeholder, creationDate }];
    } else if (modalMode === "edit") {
      data = data.map((item) => (item.id === selectedItem.id ? { ...item, ...newItem } : item));
    }
    closeModal();
  }

  function handlePageChange(event) {
    currentPage = event.detail.page;
  }
</script>

<div class="flex flex-col items-start gap-[20px] w-full bg-white rounded-[6px]">
  <div class="flex items-start justify-between w-full px-[20px] pt-[20px]">
    <div class="flex flex-col items-start gap-[16px]">
      <h5 class="text-[#3D2644] text-[16px] font-semibold">{tabTitle}</h5>
      <Tabs {tabs} {selectedTab} on:tabSelect={(e) => (selectedTab = e.detail.tab)} />
    </div>

    <button on:click={openAddModal} class="flex items-center gap-[8px] py-[10px] pl-[12px] pr-[16px] rounded-[6px] bg-[#FDEB56] hover:bg-[#cabc45]">
      <img src={AddButton} alt="" class="w-[18px]" />
      <p class="text-[#312D10] text-[14px] font-medium">Add New Genre</p>
    </button>
  </div>

  <GamesDataTable {columns} {selectedTab} data={filteredData} {totalResults} {resultsPerPage} {currentPage} {totalPages} on:edit={(e) => openEditModal(e.detail)} on:pageChange={handlePageChange} isGeners={true} />
</div>

{#if isModalOpen}
  <GenersFormModal title={modalMode === "add" ? "Add New Genre" : "Edit Genre"} formData={selectedItem} submitLabel={modalMode === "add" ? "Publish" : "Update"} on:submit={handleFormSubmit} on:close={closeModal} />
{/if}
