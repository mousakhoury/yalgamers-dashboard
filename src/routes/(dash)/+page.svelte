<script>
  import UpperInfo from "$components/UpperInfo/UpperInfo.svelte";
  import TotalUsers from "$lib/assets/images/dashboard/total-users.svg";
  import NewUsers from "$lib/assets/images/dashboard/new-users.svg";
  import TotalXP from "$lib/assets/images/dashboard/total-xp.svg";
  import TopXP from "$lib/assets/images/dashboard/top-xp.svg";
  import SiteVisits from "$components/Dashboard/SiteVisits.svelte";
  import DoughnutChart from "$components/Dashboard/DoughnutChart.svelte";
  import UserMap from "$components/Dashboard/UserMap.svelte";
  import RecentActivity from "$components/Dashboard/RecentActivity.svelte";

  $: infos = [
    {
      title: "Total Users",
      data: "19,200",
      icon: TotalUsers,
    },
    {
      title: "New Users This Month",
      data: "1,092",
      icon: NewUsers,
    },
    {
      title: "Total XP Earned",
      data: "908.02k",
      icon: TotalXP,
    },
    {
      title: "Top XP Earner",
      data: "Ali Haninah",
      icon: TopXP,
    },
  ];

  const usersChart = {
    userLabels: ["Mobile Users", "Desktop Users"],
    userData: [12012, 8000],
    userColors: ["#ECB117", "#1B17EC"],
    userTitle: "Users",
  };

  const activeUsers = {
    userLabels: ["Not Active Users", "Active Users"],
    userData: [9200, 15012],
    userColors: ["#F71756", "#1FD031"],
    userTitle: "Users",
  };
</script>

<UpperInfo {infos} />

<div class="flex items-start gap-[24px] w-full">
  <div class="flex flex-col items-start gap-[24px] w-full">
    <SiteVisits />
    <div class="flex items-start gap-[24px] w-full">
      <DoughnutChart labels={usersChart.userLabels} data={usersChart.userData} colors={usersChart.userColors} title={usersChart.userTitle} />
      <DoughnutChart labels={activeUsers.userLabels} data={activeUsers.userData} colors={activeUsers.userColors} title={activeUsers.userTitle} />
    </div>
  </div>
  <div class="flex flex-col items-start gap-[24px] w-[400px] shrink-0">
    <UserMap />
    <RecentActivity />
  </div>
</div>
