<!-- src/DeckBrowser.svelte -->  
<script lang="ts">  
	import {asyncGetDeckCards, asyncBatchRemoveNotes, asyncSuspendCards, asyncUnsuspendCards} from '$lib/api/api';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { asyncGetNote } from '$lib/api/api';
	import DeckTools from '../../../components/DeckTools.svelte';
	import NoteData from '../../../components/NoteData.svelte';	
	import kiki_logo from "$lib/images/kiki_logo.png";

	const LOAD_NUM = 100; // Number of notes to load at a time. This is set to 50 in the backend

	let cards : any[] = $state([]);
	let total = $state(0);
	let editMode = $state(false);
	let loaded = $state(false);
	let row_loaded = $state(true);
	let error = $state("");
	let table: any = $state(null);
	let row_count = $state(0);
	let query = $state("all");

	async function initTable(){
		loaded = false;
		try{
			const res = await asyncGetDeckCards(parseInt($page.params.did), query, 0);
			total = res.total;
			cards = res.cards.map((card:any) => {
				return {cid: card.cid, nid: card.nid, title: card.title, state: card.state, tmp: card.ord, selected : false};
			});
			loaded = true;
		}catch(e){
			error = "Oops! Something went wrong. Please try again later.";
			console.log(e);
		}
	}

	async function loadTable(){
		row_loaded = false;
		if (row_count >= total) return;
		row_count += LOAD_NUM;
		const res = await asyncGetDeckCards(parseInt($page.params.did), query, row_count);
		const new_cards = res.cards.map((card:any) => {
			return {cid: card.cid, nid: card.nid, title: card.title, state: card.state, tmp: card.ord, selected : false};
		});
		cards = cards.concat(new_cards);
		row_loaded = true;
	}

	onMount(async () => {
		await initTable();

		if (table) {
			table.addEventListener("scroll", async () => {
				if (
					table.scrollTop + table.clientHeight >=
					(table.scrollHeight -1)
				) {
					await loadTable();
				}
			});
		}
	});

	async function deleteCards(){
		const selectedCards = cards.filter((note:any) => note.selected);
		const confirm = window.confirm(`Are you sure you want to delete ${selectedCards.length} cards?`);
		if (!confirm) return;
		const cids = selectedCards.map((card:any) => card.id);
		const remainingNotes = cards.filter((card:any) => !card.selected);
		await asyncBatchRemoveNotes(cids);
		cards = remainingNotes;
		window.alert("Cards deleted successfully!");
	}

	async function suspendCards(){
		const selectedCards = cards.filter((card:any) => card.selected);
		const suspendedCards = selectedCards.filter((card:any) => card.state == -1);
		if (suspendedCards.length == selectedCards.length){
			const confirm = window.confirm(`Are you sure you want to unsuspend ${selectedCards.length} cards?`);
			if (!confirm) return;
			await asyncUnsuspendCards(suspendedCards.map((card:any) => card.cid));
			for (let i = 0; i < selectedCards.length; i++){
				selectedCards[i].state = 0;
			}
			return;
		}
		const unsuspendedCards = selectedCards.filter((note:any) => note.state != -1);
		const confirm = window.confirm(`Are you sure you want to suspend ${unsuspendedCards.length} card?`);
		if (!confirm) return;
		await asyncSuspendCards(unsuspendedCards.map((card:any) => card.cid));
		for (let i = 0; i < selectedCards.length; i++){
				selectedCards[i].state = -1;
			}
		window.alert("Notes suspended successfully!");
	}

	let note_data = $state({Front:"", Back:""});
	let show_note = $state(false);
	let cur_nid = $state(-1);
	async function showNoteData(nid:number){
		show_note = true;
        const res = await asyncGetNote(nid);
        note_data = res;
		cur_nid = nid;
    }

	$effect(() => {
		const selected = cards.filter((note:any) => note.selected);
		if (selected.length == 0){
			editMode = false;
		} else{
			editMode = true;
		}
	});

	function showState(state: Number){
		if (state === 0){
			return "○"
		}else if (state == 1){
			return "✔"
		}else if (state == -1){
			return "❅"
		}
	}
</script> 
{#if !loaded && error == ""}
<div class="flex w-full items-center gap-2 pt-2 pb-2 mb-2 bg-base-100">
    <a href="/decks" aria-label="Home"><img src={kiki_logo} class=" h-20 w-20 p-2"/></a>
</div>
{/if}
<div class={loaded?"":"hidden"}>
<DeckTools 
		editMode={editMode} 
		triggerDelete={()=>{deleteCards()}} 
		tiggerSuspend={()=>{suspendCards()}}
		searchNote={(q:string)=>{query=q?q:"all";initTable();}}
/>
</div>
<div class={"max-h-[50rem] flex-grow overflow-auto mb-10 w-full shadow-2xl " + (loaded?"":" hidden")} bind:this={table}>
	<table class={"table table-zebra max-w-full" + (loaded?"":" hidden")}>
	  <!-- head -->
	  <thead class="sticky -top-1 bg-base-100 h-full">
		<tr class="w-full">
			<th class="max-w-6">#</th>
			<th class="max-w-6">State</th>
			<th class="max-w-[10rem]">Card Preview</th>
			<th class="max-w-8">tmp</th>
			<th class="max-w-6"></th>
		</tr>
	  </thead>
	  <tbody>
	  {#each cards as card, i}
		<tr class="w-full">
			<td class="max-w-6">{i}</td>
			<td class="max-w-6"><p class={"text-md" + (card.state < 0?" text-blue-400":"")}>{showState(card.state)}</p></td>
			<td class="max-w-[10rem]" onclick={()=>{showNoteData(card.nid)}} role="button"><p class="break-all">{card.title}</p></td>
			<td class="max-w-8"><p>{card.tmp + 1}</p></td>
			<td class={"w-6"}><input type="checkbox" class="checkbox bg-base-300" bind:checked={card.selected}/></td>
		</tr>	
	  {/each}
	  {#if !row_loaded}
		<tr>
			<td class="max-w-8"><div class="skeleton max-w-[18rem] w-full"></div></td>
		</tr>
	  {/if}
	  </tbody>
	</table>
	<btn class="btn w-20" onclick={loadTable}>Load More</btn>
</div>

{#if !loaded && error == ""}
<div class="flex w-full flex-col gap-4">
	{#each [1,2,3,4,5,6,7] as i}
		<div class="flex flex-row w-full gap-4">
			<div class="skeleton h-8 w-14"></div>
			<div class="skeleton h-8 w-full"></div>
		</div>
	{/each}
  </div>
{/if}

{#if error != ""}
	<div class="alert alert-error">{error}</div>
{/if}

{#if show_note}
	<NoteData nid={cur_nid} note_data={note_data} close={()=>{show_note=false}}/>
{/if}

