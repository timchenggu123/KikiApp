<!-- src/DeckBrowser.svelte -->  
<script lang="ts">  
	// import { decks } from '$lib/dummy/dummy';  
	import {asyncGetDecks} from "$lib/api/api"
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type {TypeDeck} from "$lib/api/types";

	
	let decks: TypeDeck[] = $state([]);

	onMount(async () => {
		const res:[TypeDeck] = await asyncGetDecks();
		decks = res;
		console.log(res);
	});

	let onSelectDeck = (deck:any)=>{return;};  

	function selectDeck(deck:any) {  
	  onSelectDeck(deck);  
	}
</script>  
	
<h2 class="p-2">All Decks</h2>  
<ul class="menu bg-base-200 rounded-box w-full max-w-[30rem]">  
{#each decks as deck}
	<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
		<div class="flex justify-end">
			<a class="flex flex-grow h-full align-middle flex-wrap" href={`/study/`+ deck.id}>{deck.name}</a>
			<a class="btn-circle btn-sm text-2xl text-center" href={`/decks/` + deck.id}>👓</a>
			<a class="btn-circle btn-sm text-2xl text-center">⚙</a>
		</div> 
	</li>
{/each}  
</ul> 