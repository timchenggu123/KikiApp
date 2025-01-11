<script lang="ts">
	import AddCard from "./AddCard.svelte";
    import { asyncGetCardNote, asyncRemoveCard, asyncSuspendCard } from "$lib/api/api";
	import EditCard from "./EditCard.svelte";
	import KikiButton from "./KikiButton.svelte";
    let {curCardID, curDeck} = $props();

    async function refresh() {
        location.reload();
    }
    async function deleteCard() {
        // Ask the user for confirmation
        if (!confirm("Are you sure you want to delete this card?")) {
            return;
        }
        const res = await asyncRemoveCard(curCardID);
        refresh();
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
        const res = await asyncSuspendCard(curCardID);
        refresh();
    }
</script>

<div class="flex flex-row items-center gap-2 py-2">
    <KikiButton/>
    <div class="flex-grow flex flex-row justify-end items-center gap-2">
        <AddCard curCardID={curCardID} curDeck={curDeck}/>
        <div class="btn btn-circle text-2xl" onclick={getCardNote}>✎</div>
        <div class="btn btn-circle text-2xl" aria-label="Suspend Card" onclick={suspendCard}>❅</div>
        <div class="btn btn-circle" aria-label="Delete Card" onclick={deleteCard}>🗑</div>
    </div>
</div>

{#if showNote}
<EditCard nid={nid} note_data={note_data} close={()=>{showNote=false}}/>
{/if}