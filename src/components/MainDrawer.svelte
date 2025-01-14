<script lang="ts">
	import { goto, invalidateAll } from "$app/navigation";
	import { asyncLogout } from "$lib/api/api";
    import kiki_banner from "$lib/images/kiki_banner.png";
    
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

    function redirectNotes(){
        closeDrawer();
        goto("/notes");
    }

    function redirectStats(){
        closeDrawer();
        goto("/stats");
    }

    function redirectLogs(){
        closeDrawer();
        goto("/logs");
    }

</script>

<ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
    <!-- Sidebar content here -->
    <li class="max-h-[15rem] h-full w-full pb-10"><div class="h-[8rem]"><img class="rounded-md" src={kiki_banner} alt="kiki_banner"/></div></li>
    <li><a onclick={redirectDecks}>Decks</a></li>
    <!-- <li><a onclick={redirectNotes}>Notes</a></li> -->
    <!-- <li><a onclick={redirectStats}>Study Stats</a></li> -->
    <li><a onclick={redirectLogs}>Study Logs</a></li>
    <li><a onclick={logout}>Log Out</a></li>
    <!-- <li><a>Account</a></li> -->
</ul>

