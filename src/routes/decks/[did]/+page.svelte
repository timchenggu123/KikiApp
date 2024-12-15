<!-- src/DeckBrowser.svelte -->  
<script lang="ts">  
	import {asyncGetDeckCards} from '$lib/api/api';
	import type { TypeCard } from '$lib/api/types';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let cards : TypeCard[] = $state([{cid:0, Front:"", Back:""}]);
	onMount(async () => {
		const res = await asyncGetDeckCards(parseInt($page.params.did));
		console.log(res);
		cards = res;
	});
</script>  
	
<!-- <div class="grid grid-row-2 gap-4">
	<div class="grid grid-cols-3">
		<div class="col-start-1">
			Front
		</div>
		<div class="col-start-2">
			Back
		</div>
	</div>
	{#each cards as card}
		<div class="grid grid-cols-3">
			<div class="col-start1">
				{card.Front}
			</div>
			<div class="col-start-2">
				{card.Back}
			</div>
		</div>
	{/each}  
</div> -->
<div class="overflow-x-auto">
	<table class="table table-zebra">
	  <!-- head -->
	  <thead>
		<tr>
		  <th>Front</th>
		  <th>Back</th>
		</tr>
	  </thead>
	  <tbody>
	  {#each cards as card}
		<tr>
			<td>{card.Front}</td>
			<td>{card.Back}</td>
		</tr>	
	  {/each}
	  </tbody>
	</table>
</div>