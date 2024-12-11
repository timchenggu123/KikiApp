<!-- src/DeckBrowser.svelte -->  
<script lang="ts">  
	// import { getDeck } from '$lib/dummy/adapter';  
	import {asyncGetDeckCards} from '$lib/api/api';
	import type { Card } from '$lib/api/types';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	// import { cards } from '$lib/dummy/dummy';

	let cards : Card[] = $state([{id:0, Front:"", Back:""}]);
	onMount(async () => {
		const res = await asyncGetDeckCards(parseInt($page.params.did));
		console.log(res);
		cards = res;
	});
</script>  
	
<h2>Cards</h2>  
<div class="grid grid-row-2 gap-4">
	{#each cards as card}
		<div class="grid grid-cols-3">
			<a class="col-start-1" href={`/cards/` + card.id}>
				{card.id}
			</a>
			<div class="col-start2">
				{card.Front}
			</div>
			<div class="col-start-3">
				{card.Back}
			</div>
		</div>
	{/each}  
</div>
