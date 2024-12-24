<script lang="ts">
	let { note_data, close } = $props();
</script>

<dialog class="modal" open>
<div class="modal-box max-w-[30rem] w-full m-auto">
	<div class="flex flex-col px-2">
        <div class="flex justify-end w-full">
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
					<td class="max-w-[15rem]"><p class="break-all">{data[1]}</p></td>
				</tr>	
			{/each}
			</tbody>
			</table>
		</div>
	</div>
</div>	
</dialog>