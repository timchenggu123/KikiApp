<script>
	import AddCard from "./AddCard.svelte";
    let {cur_card_id} = $props();
</script>

<div class="grid grid-cols-5 gap-2 pb-4">
    <AddCard cur_card_id={cur_card_id}/>
    <a class="btn" href="/decks">Edit</a>
    <a class="btn" href="/decks">Delete</a>
</div>