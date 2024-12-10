<!-- src/DeckBrowser.svelte -->  
<script lang="ts">  
	import { getDeck } from '$lib/dummy/adapter';  
	import { page } from '$app/stores';

	let deck = getDeck(parseInt($page.params.did));
	export let cards = deck ? deck.cards: [];
</script>  
	
<h2>Cards</h2>  
<div class="grid grid-row-2 gap-4">
	{#each cards as card}
		<div class="grid grid-cols-3">
			<a class="col-start-1" href={`/cards/` + card.id}>
				{card.id}
			</a>
			<div class="col-start2">
				{card.front}
			</div>
			<div class="col-start-3">
				{card.back}
			</div>
		</div>
	{/each}  
</div>
