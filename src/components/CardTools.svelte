<script>
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

<div class="grid grid-cols-5 gap-2 pb-4">
    <AddCard curCardID={curCardID} curDeck={curDeck}/>
    <!-- <a class="btn" href="/decks">Edit</a> -->
    <div class="btn" aria-label="Delete Card" onclick={deleteCard}>Delete</div>
</div>