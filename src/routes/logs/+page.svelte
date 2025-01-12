<script lang="ts">
	import { aysncGetTodayStudyLogs, asyncGetNote } from "$lib/api/api";
	import { onMount } from "svelte";
    import NoteData from "../../components/NoteData.svelte";
	import HomeTools from "../../components/HomeTools.svelte";

    let logs: any[] = $state([]);
    onMount(async () => {
        logs = await aysncGetTodayStudyLogs();
        console.log(logs);
    });

    let note_data = $state({Front:"", Back:""});
	let show_note = $state(false);
	let cur_nid = $state(-1);
	async function showNoteData(nid:number){
		show_note = true;
        const res = await asyncGetNote(nid);
        note_data = res;
		cur_nid = nid;
    }

</script>

<HomeTools/>
<div class="text-3xl">Studied Today</div>
<div class={"max-h-[50rem] flex-grow overflow-auto mb-10 w-full shadow-2xl"}>
	<table class={"table table-zebra max-w-full"}>
	  <!-- head -->
	  <thead class="sticky -top-1 bg-base-100 h-full">
		<tr class="w-full">
		  <th class="max-w-8">ID</th>
		  <th class="max-w-[12rem]">Card Preview</th>
		  <th class="max-w-12">type</th>
		  <th class="max-w-12">ord</th>
		</tr>
	  </thead>
	  <tbody>
	  {#each logs as log, i}
		<tr class="w-full">
			<td class="max-w-8"><a href="#" onclick={()=>{showNoteData(log.nid)}} class="text-sky-500 hover:text-sky-700">{i+1}</a></td>
			<td class="max-w-[12rem]"><p class="break-all">{log.data}</p></td>
			<td class="max-w-12"><p>{log.log_type}</p></td>
			<td class="max-w-12"><p>{log.ord}</p></td>
		</tr>
	  {/each}
	  </tbody>
	</table>
</div>

{#if show_note}
	<NoteData nid={cur_nid} note_data={note_data} close={()=>{show_note=false}}/>
{/if}