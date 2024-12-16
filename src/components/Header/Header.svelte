<script>
  import SupportTicket from "$lib/assets/images/header/Support-Ticket.svg";
  import UsersManager from "$lib/assets/images/header/users-manager.svg";
  import XP from "$lib/assets/images/header/XP.svg";
  import Settings from "$lib/assets/images/header/Settings.svg";
  import Notifications from "$lib/assets/images/header/Notifications.svg";
  import Manager from "$lib/assets/images/header/Manager.svg";
  import User from "$lib/assets/images/header/user.svg";
  import ArrowDown from "$lib/assets/images/header/arrow-down.svg";
  import Search from "$lib/assets/images/header/search.svg";
</script>

<div class="flex items-center justify-between h-[70px] w-full px-[24px] py-[11px] border-b border-[#E9E6EA] bg-white sticky top-0">
  <div class="flex items-center gap-[12px] h-[36px] w-[320px] rounded-[4px] bg-[#F3F3F3] overflow-hidden">
    <button class="shrink-0">
      <img src={Search} alt="" class="w-[36px]" />
    </button>
    <input type="text" class="border-0 bg-transparent w-full outline-none text-[12px]" placeholder="Search..." />
  </div>
  <div class="flex items-center gap-[24px]">
    <button>
      <img src={XP} alt="" />
    </button>
    <hr class="w-[1px] h-[24px] bg-[#E9E6EA]" />
    <div class="flex items-center gap-[12px]">
      <button>
        <img src={UsersManager} alt="" />
      </button>
      <button>
        <img src={SupportTicket} alt="" />
      </button>
    </div>
    <hr class="w-[1px] h-[24px] bg-[#E9E6EA]" />

    <div class="flex items-center gap-[12px]">
      <button>
        <img src={Settings} alt="" />
      </button>
      <button>
        <img src={Notifications} alt="" />
      </button>
    </div>
    <hr class="w-[1px] h-[24px] bg-[#E9E6EA]" />
    <div class="flex items-center gap-[12px]">
      <button>
        <img src={Manager} alt="" />
      </button>
      <button class="flex items-center gap-[12px] p-[6px] pr-[14px] rounded-full border border-[#E9E6EA]">
        <div class="flex items-center gap-[10px]">
          <img src={User} alt="" />
          <p class="text-[#140718E5] text-[14px] font-semibold">Ali Haninah</p>
        </div>
        <img src={ArrowDown} alt="" />
      </button>
    </div>
  </div>
</div>
