<script lang="ts">
	import DrawerButton from "./DrawerButton.svelte";
    import KikiButton from "./KikiButton.svelte";

    let {editMode, triggerDelete, tiggerSuspend, searchNote} = $props();
    let localEditMode = $state(editMode);
    let query = $state("");
    $effect(() => {
        localEditMode = editMode;
    });
    let showSearch = $state(false);
</script>

<div class="flex w-full items-center gap-2 pt-2 pb-2 mb-2 bg-base-100">
    <KikiButton/>
    <div class="flex flex-grow justify-end gap-1">
        {#if localEditMode}
            <div class="btn w-20 bg-red-600" aria-label="Delete Cards" onclick={triggerDelete}>Delete</div>
            <div class="btn w-20 bg-blue-500" aria-label="Toggle Suspend Cards" onclick={tiggerSuspend}>Suspend</div>
        {/if}

        {#if !localEditMode}
            <button class="btn w-20" onclick={()=>{showSearch=true}}>Search</button>
        {/if}
        <DrawerButton/>
    </div>
</div>

{#if showSearch}
<dialog class="modal" open>
    <div class="modal-box flex flex-col justify-center items-center w-full">
        <div class="flex flex-row">
            <input type="text" class="input input-bordered w-full px-4" placeholder="Search for cards" bind:value={query}/>
            <button class="btn btn-primary" onclick={()=>{searchNote(query)}}>Search</button>
        </div>
    </div>
    <div class="modal-backdrop">
        <button onclick={()=>{showSearch=false}}>close</button>
    </div>
</dialog>
{/if}
