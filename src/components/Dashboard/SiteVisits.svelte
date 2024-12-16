<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
  import ArrowDown from "$lib/assets/images/dashboard/arrow-down.svg";

  let chart;
  let selectedFilter = "Today";
  let dropdownOpen = false;

  // Dropdown options
  const filters = ["Today", "Yesterday", "LastWeek", "LastMonth", "LastYear"];

  // Example data for the chart
  let data = {
    Today: generateHourlyData(24),
    Yesterday: generateHourlyData(24),
    LastWeek: generateDailyData(7),
    LastMonth: generateWeeklyData(4),
    LastYear: generateMonthlyData(12),
  };

  // Function to generate random data for demonstration purposes
  function generateHourlyData(hours) {
    return {
      labels: Array.from({ length: hours }, (_, i) => `${i}am`),
      mobile: Array.from({ length: hours }, () => Math.floor(Math.random() * 10000)),
      desktop: Array.from({ length: hours }, () => Math.floor(Math.random() * 10000)),
    };
  }

  function generateDailyData(days) {
    return {
      labels: Array.from({ length: days }, (_, i) => `Day ${i + 1}`),
      mobile: Array.from({ length: days }, () => Math.floor(Math.random() * 10000)),
      desktop: Array.from({ length: days }, () => Math.floor(Math.random() * 10000)),
    };
  }

  function generateWeeklyData(weeks) {
    return {
      labels: Array.from({ length: weeks }, (_, i) => `Week ${i + 1}`),
      mobile: Array.from({ length: weeks }, () => Math.floor(Math.random() * 10000)),
      desktop: Array.from({ length: weeks }, () => Math.floor(Math.random() * 10000)),
    };
  }

  function generateMonthlyData(months) {
    return {
      labels: Array.from({ length: months }, (_, i) => `Month ${i + 1}`),
      mobile: Array.from({ length: months }, () => Math.floor(Math.random() * 10000)),
      desktop: Array.from({ length: months }, () => Math.floor(Math.random() * 10000)),
    };
  }

  // Initialize Chart.js
  onMount(() => {
    const ctx = document.getElementById("siteVisitsChart").getContext("2d");
    createChart(ctx, data[selectedFilter]);
  });

  function createChart(ctx, chartData) {
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: "Mobile Users",
            data: chartData.mobile,
            borderColor: "#FB18E4",
            backgroundColor: "rgba(251, 24, 228, 0.15)",
            fill: true,
            tension: 0.4,
            pointRadius: 0,
          },
          {
            label: "Desktop Users",
            data: chartData.desktop,
            borderColor: "#1D96EE",
            backgroundColor: "rgba(19, 155, 238, 0.15)",
            fill: true,
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: "nearest",
            intersect: false,
          },
        },
        hover: {
          mode: "nearest",
          intersect: false,
        },
      },
    });
  }

  // Update chart on filter change
  function updateChart() {
    const newData = data[selectedFilter];
    chart.data.labels = newData.labels;
    chart.data.datasets[0].data = newData.mobile;
    chart.data.datasets[1].data = newData.desktop;
    chart.update();
  }

  // Handle filter selection
  function selectFilter(filter) {
    selectedFilter = filter;
    dropdownOpen = false;
    updateChart();
  }
</script>

<div class="flex flex-col items-start gap-[32px] w-full p-[20px] rounded-[6px] bg-white">
  <div class="flex items-center justify-between w-full">
    <h5 class="text-[#3D2644] text-[16px] font-semibold">Site Visits</h5>

    <div class="flex items-center gap-[32px]">
      <!-- Custom legend outside the chart -->
      <div class="flex items-center gap-[6px]">
        <span class="block w-[12px] h-[12px] rounded-[4px] bg-[#FB18E4]"></span>
        <p class="text-[#7E6E83] text-[12px] font-medium">Mobile Users</p>
      </div>
      <span class="flex items-center gap-[6px]">
        <span class="block w-[12px] h-[12px] rounded-[4px] bg-[#2094EE]"></span>
        <p class="text-[#7E6E83] text-[12px] font-medium">Desktop Users</p>
      </span>

      <!-- Custom Dropdown -->
      <div class="dropdown">
        <button on:click={() => (dropdownOpen = !dropdownOpen)} class="dropdown-button">
          {selectedFilter} <img src={ArrowDown} alt="" class={dropdownOpen ? "rotate-180" : ""} />
        </button>
        {#if dropdownOpen}
          <div class="dropdown-menu">
            {#each filters as filter}
              <button class="dropdown-item" on:click={() => selectFilter(filter)}>
                {filter}
              </button>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>

  <canvas id="siteVisitsChart"></canvas>
</div>

<style>
  canvas {
    width: 100%;
    max-height: 259px;
  }

  /* Dropdown Styling */
  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-button {
    padding: 6px 10px;
    border: 1px solid #e9e6ea;
    cursor: pointer;
    border-radius: 4px;
    font-size: 12px;
    color: #68566e;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 8px;
    z-index: 10;
  }

  .dropdown-item {
    padding: 6px 10px;
    cursor: pointer;
    font-size: 12px;
    width: 100%;
    display: flex;
    align-items: start;
  }

  .dropdown-item:hover {
    background-color: #f0f0f0;
  }
</style>
