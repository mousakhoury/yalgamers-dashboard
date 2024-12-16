<script>
  import Arrow from "$lib/assets/images/sidebar/subitems-arrow.svg";
  import Logo from "$lib/assets/images/logo.svg";
  import { dashboard, dashboardActive, games, gamesActive, tutorials, tutorialsActive, articles, articlesActive, news, newsActive, genres, genresActive, tournaments, tournamentsActive, Quest, QuestActive, HaveFun, HaveFunActive, Leaderboard, LeaderboardActive, Rewards, RewardsActive, Networking, NetworkingActive, local, localActive, online, onlineActive, ProjectQuest, ProjectQuestActive, GeneralQuest, GeneralQuestActive } from "$lib/assets/tools/navicons.js";

  import { onMount } from "svelte";

  // Using $state for Svelte 5 reactivity
  let navitems = [
    {
      id: 1,
      title: "Dashboard",
      img: dashboard,
      activeImg: dashboardActive,
      path: "/",
    },
    {
      id: 2,
      title: "Games",
      img: games,
      activeImg: gamesActive,
      subItems: [
        {
          title: "Tutorials",
          img: tutorials,
          activeImg: tutorialsActive,
          path: "/tutorials",
        },
        {
          title: "Articles",
          img: articles,
          activeImg: articlesActive,
          path: "/articles",
        },
        {
          title: "News",
          img: news,
          activeImg: newsActive,
          path: "/news",
        },
        {
          title: "Genres",
          img: genres,
          activeImg: genresActive,
          path: "/genres",
        },
      ],
    },
    {
      id: 3,
      title: "Tournaments",
      img: tournaments,
      activeImg: tournamentsActive,
      subItems: [
        {
          title: "Local Tournament",
          img: local,
          activeImg: localActive,
          path: "/local-tournament",
        },
        {
          title: "Online Tournament",
          img: online,
          activeImg: onlineActive,
          path: "/online-tournament",
        },
      ],
    },
    {
      id: 4,
      title: "Quest",
      img: Quest,
      activeImg: QuestActive,
      subItems: [
        {
          title: "Project Quest",
          img: ProjectQuest,
          activeImg: ProjectQuestActive,
          path: "/project-quest",
        },
        {
          title: "General Quest",
          img: GeneralQuest,
          activeImg: GeneralQuestActive,
          path: "/general-quest",
        },
      ],
    },
    {
      id: 5,
      title: "HaveFun",
      img: HaveFun,
      activeImg: HaveFunActive,
      path: "/have-fun",
    },
    {
      id: 6,
      title: "Leaderboard",
      img: Leaderboard,
      activeImg: LeaderboardActive,
      path: "/leaderboard",
    },
    {
      id: 7,
      title: "Rewards",
      img: Rewards,
      activeImg: RewardsActive,
      path: "/rewards",
    },
    {
      id: 8,
      title: "Networking",
      img: Networking,
      activeImg: NetworkingActive,
      path: "/networking",
    },
  ];

  let currentPath = $state("/"); // This would come from a router or URL.
  let expandedItemId = $state(null);

  // Function to handle the navigation click
  function handleItemClick(item) {
    if (item.subItems) {
      // Expand or collapse the submenu
      expandedItemId = expandedItemId === item.id ? null : item.id;
    } else {
      // Navigate to the item page
      currentPath = item.path;
      expandedItemId = null;
    }
  }

  // Function to check if the item is active
  function isActive(item) {
    if (item.subItems) {
      return item.subItems.some((subItem) => subItem.path === currentPath);
    }
    return item.path === currentPath;
  }

  // Function to handle subitem clicks
  function handleSubItemClick(subItem) {
    currentPath = subItem.path;
    expandedItemId = null;
  }

  // Function to handle extending the sub-menu from the button on the side
  function handleExtendClick(item) {
    expandedItemId = expandedItemId === item.id ? null : item.id;
  }

  onMount(() => {
    // Initialize currentPath with the actual current URL path if possible
    currentPath = window.location.pathname;
  });

  // Function to determine if the extend button should be visible
  function shouldShowExtendButton(item) {
    return expandedItemId === item.id || isActive(item);
  }
</script>

<div class="flex flex-col items-center sidebar z-50 sticky top-0 shrink-0 {navitems.some((item) => item.subItems && shouldShowExtendButton(item)) ? 'mr-[32px]' : ''}">
  <div class="flex flex-col items-center w-full h-full gap-[24px] pt-[24px] bg-[#140718] border-r border-[#FFFFFF1A]">
    <img src={Logo} alt="" class="w-[48px]" />
    <hr class="w-full border-[#FFFFFF1A]" />
    <div class="flex flex-col items-center w-full">
      {#each navitems as item}
        <div class="w-full bg-[#140718]">
          <a
            href={item.path}
            class="flex flex-col items-center gap-[8px] w-full py-[14px] cursor-pointer {isActive(item) ? 'active' : ''}"
            onclick={() => {
              handleItemClick(item);
            }}
          >
            <img src={isActive(item) ? item.activeImg : item.img} alt="" />
            <p class="text-[#D4CFD6] text-[12px] font-normal">{item.title}</p>
          </a>
        </div>

        <!-- Sub-items section -->
        {#if item.subItems && shouldShowExtendButton(item)}
          <div class="flex items-start absolute top-0 bg-[#1B0E1F] duration-300 z-[-1] {item.subItems && expandedItemId === item.id ? 'left-[120px]' : 'left-[-88px]'}">
            <div class="flex flex-col items-start gap-[12px] w-[208px] h-screen px-[20px] py-[40px]">
              {#each item.subItems as subItem}
                <a
                  href={subItem.path}
                  class="flex flex-row items-center gap-[8px] w-full pl-[20px] py-[10px] {currentPath === subItem.path ? 'active' : ''}"
                  onclick={() => {
                    handleSubItemClick(subItem);
                  }}
                >
                  <img src={currentPath === subItem.path ? subItem.activeImg : subItem.img} alt="" />
                  <p class="text-[#D4CFD6] text-[12px] font-normal">
                    {subItem.title}
                  </p>
                </a>
              {/each}
            </div>
            <button class=" flex items-center justify-center w-[32px] h-screen bg-[#1B0E1F]" onclick={() => handleExtendClick(item)}>
              <img src={Arrow} alt="" class="duration-300 {item.subItems && expandedItemId === item.id ? 'rotate-180' : ''}" />
            </button>
          </div>
        {/if}

        {#if item.subItems && expandedItemId === item.id}
          <button aria-labelledby="text" onclick={() => handleExtendClick(item)} class="fixed top-0 left-0 w-full h-screen bg-[#000000B2] z-[-2]"></button>
        {/if}
      {/each}
    </div>
  </div>
</div>

<style>
  .sidebar {
    background-color: #140718;
    width: 120px;
    height: 100vh;
  }

  .sidebar a.active {
    background-color: #fdeb560d; /* Lighter background for active items */
  }

  .sidebar a.active p {
    color: #fdeb56;
  }

  .sidebar img.active {
    content: url("{activeImg}");
  }

  .submenu {
    background-color: #2b1b2e; /* Lighter background for submenus */
  }
</style>
