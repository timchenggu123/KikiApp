<script lang="ts">
	import { asyncEditNote } from "$lib/api/api";

	let {nid, note_data, close } = $props();
    let edit_mode = $state(false);
    async function edit_save(){
        if (edit_mode){
            let field_data: any = [];
            note_data.forEach((item: any) => {
                field_data.push(item[1]);
            });
            try{
                const response = await asyncEditNote(nid, field_data);
                if (!response || !response.ok){
                    window.alert("Oops! Something went wrong. Please try again later.");
                }
                window.alert("Note updated successfully!");
            }catch(e: any){
                window.alert("Oops! Something went wrong. Please try again later.");
            }
        }
        edit_mode = !edit_mode;
    }
</script>

<dialog class="modal" open>
<div class="modal-box max-w-[30rem] w-full m-auto">
	<div class="flex flex-col px-2">
        <div class="flex justify-between w-full">
            <button class="btn w-24" onclick={edit_save}>{edit_mode ? "Save" : "Edit"}</button>
		    <button class="btn w-24" onclick={close}>Close</button>
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
			{#each note_data as data}
				<tr>
					<td class="max-w-[15rem]"><p class="break-all">{data[0]}</p></td>
                    {#if !edit_mode}
					<td class="max-w-[15rem]"><p class="break-all">{data[1]}</p></td>
                    {:else}
                    <td class="max-w-[15rem]"><textarea class="textarea textarea-bordered max-w-[15rem]" bind:value={data[1]}></textarea></td>
                    {/if}
				</tr>	
			{/each}
			</tbody>
			</table>
		</div>
	</div>
</div>	
</dialog>