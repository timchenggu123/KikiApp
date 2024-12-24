<script lang="ts">
    import { page } from '$app/stores';
	import { asyncGetNote } from '$lib/api/api';
	import { onMount } from 'svelte';

    let card_data: any[] = $state([]);
    onMount(fetchNote);
    async function fetchNote(){
        const res = await asyncGetNote(parseInt($page.params.nid));
        card_data = res;
    }
</script>
<div class="flex flex-col my-4">
    <button class="btn w-24" onclick={()=>{history.back()}}>{"< Back"}</button>
</div>
<div>
	<table class="table table-zebra">
	  <!-- head -->
	  <thead>
		<tr>
		  <th>Key</th>
		  <th>Field</th>
		</tr>
	  </thead>
	  <tbody>
	  {#each card_data as data}
		<tr>
			<td class="max-w-[15rem]"><p class="break-all">{data[0]}</p></td>
			<td class="max-w-[15rem]"><p class="break-all">{data[1]}</p></td>
		</tr>	
	  {/each}
	  </tbody>
	</table>
</div>