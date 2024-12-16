<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  export let labels = []; // Array of labels for the chart
  export let data = []; // Array of data values for each segment
  export let colors = []; // Array of colors for each segment
  export let title = "Chart Title"; // Title to display above the legend
  export let chartId = "chart-" + Math.random().toString(36).substr(2, 9); // Generate a unique ID if not provided

  let chart;

  // Initialize Chart.js
  onMount(() => {
    const ctx = document.getElementById(chartId).getContext("2d");
    createChart(ctx);
  });

  function createChart(ctx) {
    chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: colors,
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        cutout: "70%", // Inner radius to make it a doughnut chart
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });
  }
</script>

<div class="flex items-center justify-start gap-[28px] p-[30px] pr-[29px] rounded-[6px] bg-white w-full">
  <div class="chart-container">
    <canvas id={chartId}></canvas>
  </div>

  <div class="flex flex-col items-start gap-[12px]">
    <h5 class="text-[#3D2644] text-[16px] font-semibold">{title}</h5>
    <div class="flex items-start gap-[20px]">
      {#each labels as label, index}
        <div class="flex flex-col items-start gap-[4px]">
          <div class="flex items-center gap-[6px]">
            <span class="block w-[12px] h-[12px] rounded-[4px]" style="background-color: {colors[index]}"></span>
            <p class="text-[#7E6E83] text-[12px] font-medium">{label}</p>
          </div>
          <p class="text-[#533E59] text-[14px] font-semibold">{data[index].toLocaleString()}</p>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .chart-container {
    width: 100px;
    height: 100px;
  }
</style>
