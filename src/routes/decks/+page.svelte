<!-- src/DeckBrowser.svelte -->  
<script lang="ts">  
	import { decks } from '$lib/dummy/dummy';  
	import { page } from '$app/stores';
	export let onSelectDeck = (deck:any)=>{return;};  
	
	function selectDeck(deck:any) {  
	  onSelectDeck(deck);  
	}
</script>  
	
<h2>Decks</h2>  
<ul>  
{#each decks as deck}
	<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
		<a href={`decks/`+ deck.id}>{deck.name}</a> 
	</li>
{/each}  
</ul> 