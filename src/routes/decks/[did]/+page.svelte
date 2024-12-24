<!-- src/DeckBrowser.svelte -->  
<script lang="ts">  
	import {asyncGetDeckNotes, asyncBatchRemoveNotes} from '$lib/api/api';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import DeckTools from '../../../components/DeckTools.svelte';

	let notes : any[] = $state([{cid:0, title:"", selected:false}]);
	let editMode = $state(false);
	onMount(async () => {
		const res = await asyncGetDeckNotes(parseInt($page.params.did));
		notes = res.map((note:any) => {
			return {id: note.id, title: note.title, selected : false};
		});
	});

	async function deleteCards(){
		const selectedNotes = notes.filter((note:any) => note.selected);
		const nids = selectedNotes.map((note:any) => note.id);
		const remainingNotes = notes.filter((note:any) => !note.selected);
		await asyncBatchRemoveNotes(nids);
		notes = remainingNotes;
	}
</script>  

<DeckTools toggleEditMode={()=>{editMode=!editMode}} editMode={editMode} triggerDelete={()=>{deleteCards()}}/>
<div>
	<table class="table table-zebra">
	  <!-- head -->
	  <thead>
		<tr>
		  <th class="max-w-8">ID</th>
		  <th class="max-w-[18rem]">Card Front</th>
		  <th class={"max-w-6" + (editMode ? "":" hidden")}>Select</th>
		</tr>
	  </thead>
	  <tbody>
	  {#each notes as note, i}
		<tr>
			<td class="max-w-8"><a href={`/notes/` + note.id} class="text-sky-500 hover:text-sky-700">{i+1}</a></td>
			<td class="max-w-[18rem]"><p class="break-all">{note.title}</p></td>
			<td class={"max-w-6" + (editMode ? "":" hidden")}><input type="checkbox" class="checkbox" bind:checked={note.selected}/></td>
		</tr>	
	  {/each}
	  </tbody>
	</table>
</div>