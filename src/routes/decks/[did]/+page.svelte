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

	let notes : any[] = $state([{cid:0, title:"", selected:false}]);
	let rows: any[] = $state([]);
	let row_idx = 0;
	let editMode = $state(false);
	let loaded = $state(false);
	let error = $state("");
	let table: any = $state(null);

	function loadTable(){
		for (let i = 0; i < 20; i ++){
			if (row_idx >= notes.length) break;
			rows.push(notes[row_idx]);
			row_idx += 1;
		}
	}
	onMount(async () => {
		loaded = false;
		try{
		const res = await asyncGetDeckNotes(parseInt($page.params.did));
		notes = res.map((note:any) => {
			return {id: note.id, title: note.title, selected : false};
		});
		loaded = true;
		}catch(e){
			error = "Oops! Something went wrong. Please try again later.";
			console.log(e);
		}

		if (table) {
			loadTable();
			table.addEventListener("scroll", function () {
				if (
					table.scrollTop + table.clientHeight >=
					table.scrollHeight
				) {
					if (rows.length <= notes.length) {
						loadTable();
					}
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
	let showStatsModal = $state(false); 
	async function showStats(){
		showStatsModal = true;
	}
</script> 
{#if !loaded && error == ""}
<div class="flex w-full items-center gap-2 pt-2 pb-2 mb-2 bg-base-100">
    <a href="/decks" aria-label="Home"><img src={kiki_logo} class=" h-20 w-20 p-2"/></a>
</div>
{/if}
<div class={loaded?"":"hidden"}>
<DeckTools 
		toggleEditMode={()=>{editMode=!editMode}}
		editMode={editMode} 
		triggerDelete={()=>{deleteCards()}} 
		showStats={showStats}
/>
</div>
<div class={"max-h-[50rem] flex-grow overflow-auto mb-10 " + (loaded?"":" hidden")} bind:this={table}>
	<table class={"table table-zebra" + (loaded?"":" hidden")}>
	  <!-- head -->
	  <thead class="sticky top-0 bg-base-100">
		<tr>
		  <th class="max-w-8">ID</th>
		  <th class="max-w-[18rem]">Card Front</th>
		  <th class={"max-w-6"}>Select</th>
		</tr>
	  </thead>
	  <tbody>
	  {#each rows as note, i}
		<tr>
			<td class="max-w-8"><a href="#" onclick={()=>{showNoteData(note.id)}} class="text-sky-500 hover:text-sky-700">{i+1}</a></td>
			<td class="max-w-[18rem]"><p class="break-all">{note.title}</p></td>
			<td class={"max-w-6"}><input type="checkbox" class="checkbox bg-base-300" bind:checked={note.selected}/></td>
		</tr>	
	  {/each}
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

{#if showStatsModal}
<DeckStats did={parseInt($page.params.did)} close={()=>{showStatsModal = false;}}/>
{/if}