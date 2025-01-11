<script>
    import kiki_logo from "$lib/images/kiki_logo.png";
    let {toggleEditMode, editMode, triggerDelete, showStats} = $props();
    let localEditMode = $state(editMode);
    $effect(() => {
        localEditMode = editMode;
    });
</script>

<div class="sticky z-50 top-0 flex w-full items-center gap-2 pt-2 pb-2 mb-2 bg-base-100">
    <a href="/decks" aria-label="Home"><img src={kiki_logo} class=" h-20 w-20 p-2"/></a>
    <div class="flex flex-grow justify-end gap-1">
		<button class="btn w-20" onclick={showStats}>Stats</button>
        {#if localEditMode}
            <div class="btn w-20 bg-red-600" aria-label="Delete Cards" onclick={triggerDelete}>Delete</div>
        {/if}
    </div>
</div>