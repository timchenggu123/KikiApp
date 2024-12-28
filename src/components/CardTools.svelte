<script lang="ts">
    import kiki_logo from "$lib/images/kiki_logo.png";
	import AddCard from "./AddCard.svelte";
    import { asyncGetCardNote, asyncRemoveCard } from "$lib/api/api";
	import EditCard from "./EditCard.svelte";
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
</script>

<div class="flex flex-row items-center gap-2 py-2">
    <a href="/decks" aria-label="Home"><img src={kiki_logo} class=" h-20 w-20 p-2"/></a>
    <div class="flex-grow flex flex-row justify-end items-center gap-2">
        <AddCard curCardID={curCardID} curDeck={curDeck}/>
        <a class="btn btn-circle" href="#" onclick={getCardNote}>🖉</a>
        <div class="btn btn-circle bg-red-500" aria-label="Delete Card" onclick={deleteCard}>🗑</div>
    </div>
</div>

{#if showNote}
<EditCard nid={nid} note_data={note_data} close={()=>{showNote=false}}/>
{/if}