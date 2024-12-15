<script>
	import AddCard from "./AddCard.svelte";
    import { asyncRemoveCard } from "$lib/api/api";
    let {cur_card_id} = $props();

    async function refresh() {
        location.reload();
    }
    async function deleteCard() {
        // Ask the user for confirmation
        if (!confirm("Are you sure you want to delete this card?")) {
            return;
        }
        const res = await asyncRemoveCard(cur_card_id);
        refresh();
    }
</script>

<div class="grid grid-cols-5 gap-2 pb-4">
    <AddCard cur_card_id={cur_card_id}/>
    <!-- <a class="btn" href="/decks">Edit</a> -->
    <div class="btn" aria-label="Delete Card" onclick={deleteCard}>Delete</div>
</div>