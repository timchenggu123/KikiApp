<script>
    import kiki_logo from "$lib/images/kiki_logo.png";
	import AddCard from "./AddCard.svelte";
    import { asyncRemoveCard } from "$lib/api/api";
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
</script>

<div class="flex flex-row items-center gap-2 py-4">
    <img src={kiki_logo} class=" h-20 w-20 p-2"/>
    <AddCard curCardID={curCardID} curDeck={curDeck}/>
    <!-- <a class="btn" href="/decks">Edit</a> -->
    <div class="btn" aria-label="Delete Card" onclick={deleteCard}>Delete</div>
</div>