<script lang="ts">
	import AddCard from "./AddCard.svelte";
    import { asyncGetCardNote, asyncRemoveCard, asyncSuspendCards } from "$lib/api/api";
	import EditCard from "./EditCard.svelte";
	import KikiButton from "./KikiButton.svelte";
    import DeckStats from "./DeckStats.svelte";
    let {curCardID, curDeck} = $props();
    let showMoreMenu = $state(false);

    async function refresh() {
        location.reload();
    }

    let nid = $state(-1);
    let note_data = $state([]);
    let showNote = $state(false);
    async function getCardNote(){
        showNote = true;
        const res = await asyncGetCardNote(curCardID);
        nid = res.id;
        note_data = res.note_data;
    }
    async function suspendCard(){
        // Ask the user for confirmation
        if (!confirm("Are you sure you want to suspend this card?")) {
            return;
        }
        const res = await asyncSuspendCards([curCardID]);
        refresh();
    }

    let showStatsModal = $state(false); 
	async function showStats(){
        showMoreMenu = false;
		showStatsModal = true;
	}
    async function deleteCard() {
        showMoreMenu = false;
        // Ask the user for confirmation
        if (!confirm("Are you sure you want to delete this card?")) {
            return;
        }
        const res = await asyncRemoveCard(curCardID);
        refresh();
    }
</script>
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div class="flex flex-row items-center gap-2 py-2">
    <KikiButton/>
    <div class="flex-grow flex flex-row justify-end items-center gap-2">
        <AddCard curCardID={curCardID} curDeck={curDeck}/>
        <div class="btn btn-circle text-2xl" onclick={getCardNote}>✎</div>
        <div class="btn btn-circle text-2xl" aria-label="Suspend Card" onclick={suspendCard}>❅</div>
        <div class={"dropdown dropdown-end" + (showMoreMenu?" dropdown-open":"")}>
            <div onclick={()=>{showMoreMenu = !showMoreMenu}} role="button" class="btn btn-circle text-2xl" aria-label="More"><p class="m-auto">⋮</p></div>
            <ul class="menu dropdown-content bg-base-100 rounded-box z-[50] w-52 p-2 shadow-xl">
              <li onclick={showStats}><p>Stats</p></li>
              <li onclick={deleteCard}><p>Delete</p></li>
            </ul>
            <div class={"fixed left-0 top-0 h-screen w-screen z-[49]" + (showMoreMenu?" ":" hidden")} onclick={()=>{showMoreMenu = !showMoreMenu}}></div>
        </div>
    </div>
</div>

{#if showNote}
<EditCard nid={nid} note_data={note_data} close={()=>{showNote=false}}/>
{/if}

{#if showStatsModal}
<DeckStats did={curDeck} close={()=>{showStatsModal = false;}}/>
{/if}