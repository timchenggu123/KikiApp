<script>
	import DrawerButton from "./DrawerButton.svelte";
    import KikiButton from "./KikiButton.svelte";

    let {toggleEditMode, editMode, triggerDelete, showStats} = $props();
    let localEditMode = $state(editMode);
    $effect(() => {
        localEditMode = editMode;
    });
</script>

<div class="sticky z-50 top-0 flex w-full items-center gap-2 pt-2 pb-2 mb-2 bg-base-100">
    <KikiButton/>
    <div class="flex flex-grow justify-end gap-1">
        {#if localEditMode}
            <div class="btn w-20 bg-red-600" aria-label="Delete Cards" onclick={triggerDelete}>Delete</div>
        {/if}
		<button class="btn w-20" onclick={showStats}>Stats</button>
        <DrawerButton/>
    </div>
</div>