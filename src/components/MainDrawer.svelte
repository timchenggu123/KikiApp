<script lang="ts">
	import { goto, invalidateAll } from "$app/navigation";
	import { asyncLogout } from "$lib/api/api";
    
    let {closeDrawer} = $props();
    async function logout() {
        closeDrawer();
        await asyncLogout();
        goto("/auth/login");
    }

    function redirectDecks(){
        closeDrawer();
        goto("/decks");
    }

</script>

<ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
    <!-- Sidebar content here -->
    <li class="max-h-[15rem] h-full w-full pb-10"><div class="h-[8rem] bg-yellow-300"></div></li>
    <li><a onclick={redirectDecks}>Decks</a></li>
    <li><a>Notes</a></li>
    <li><a>Stats</a></li>
    <li><a onclick={logout}>Log Out</a></li>
    <!-- <li><a>Account</a></li> -->
</ul>

