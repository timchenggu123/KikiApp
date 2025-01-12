<!-- src/DeckBrowser.svelte -->  
<script lang="ts">  
	import {asyncGetDeckNotes, asyncBatchRemoveNotes} from '$lib/api/api';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { asyncGetNote } from '$lib/api/api';
	import DeckTools from '../../../components/DeckTools.svelte';
	import NoteData from '../../../components/NoteData.svelte';
	import DeckStats from '../../../components/DeckStats.svelte';	
	import kiki_logo from "$lib/images/kiki_logo.png";

	const LOAD_NUM = 100; // Number of notes to load at a time. This is set to 50 in the backend

	let notes : any[] = $state([{cid:0, title:"", selected:false}]);
	let total = 0;
	let editMode = $state(false);
	let loaded = $state(false);
	let row_loaded = $state(true);
	let error = $state("");
	let table: any = $state(null);
	let row_count = 0;
	let query = $state("all");

	async function initTable(){
		loaded = false;
		try{
			const res = await asyncGetDeckNotes(parseInt($page.params.did), query, 0);
			total = res.total;
			notes = res.notes.map((note:any) => {
				return {id: note.id, title: note.title, selected : false};
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
		const res = await asyncGetDeckNotes(parseInt($page.params.did), query, row_count);
		const new_notes = res.notes.map((note:any) => {
			return {id: note.id, title: note.title, selected : false};
		});
		notes = notes.concat(new_notes);
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
		const selectedNotes = notes.filter((note:any) => note.selected);
		const confirm = window.confirm(`Are you sure you want to delete ${selectedNotes.length} notes?`);
		if (!confirm) return;
		const nids = selectedNotes.map((note:any) => note.id);
		const remainingNotes = notes.filter((note:any) => !note.selected);
		await asyncBatchRemoveNotes(nids);
		notes = remainingNotes;
		window.alert("Notes deleted successfully!");
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
		const selected = notes.filter((note:any) => note.selected);
		if (selected.length == 0){
			editMode = false;
		} else{
			editMode = true;
		}
	});

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
		searchNote={(q:string)=>{query=q?q:"all";initTable();}}
/>
</div>
<div class={"max-h-[50rem] flex-grow overflow-auto mb-10 w-full shadow-2xl " + (loaded?"":" hidden")} bind:this={table}>
	<table class={"table table-zebra max-w-full" + (loaded?"":" hidden")}>
	  <!-- head -->
	  <thead class="sticky -top-1 bg-base-100 h-full">
		<tr class="w-full">
		  <th class="max-w-8">ID</th>
		  <th class="max-w-[12rem]">Card Preview</th>
		  <th class="max-w-6"></th>
		</tr>
	  </thead>
	  <tbody>
	  {#each notes as note, i}
		<tr class="w-full">
			<td class="max-w-8"><a href="#" onclick={()=>{showNoteData(note.id)}} class="text-sky-500 hover:text-sky-700">{i+1}</a></td>
			<td class="max-w-[12rem]"><p class="break-all">{note.title}</p></td>
			<td class={"max-w-6"}><input type="checkbox" class="checkbox bg-base-300" bind:checked={note.selected}/></td>
		</tr>	
	  {/each}
	  {#if !row_loaded}
		<tr>
			<td class="max-w-8"><div class="skeleton max-w-[18rem] w-full"></div></td>
		</tr>
	  {/if}
	  </tbody>
	</table>
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

