<script>
    import kiki_logo from "$lib/images/kiki_logo.png";
    let {toggleEditMode, editMode, triggerDelete} = $props();
    let localEditMode = $state(editMode);
    $effect(() => {
        localEditMode = editMode;
    });
</script>

<div class="sticky z-50 top-0 grid grid-cols-5 justify-between items-center gap-2 pt-4 pb-2 mb-2 bg-base-100">
    <a href="/decks" aria-label="Home"><img src={kiki_logo} class=" h-20 w-20 p-2"/></a>
    {#if localEditMode}
        <div class="btn col-start-4 bg-red-400" aria-label="Delete Cards" onclick={triggerDelete}>Delete</div>
    {/if}
    <div class="btn col-start-5" aria-label="Edit Deck" onclick={toggleEditMode}>Edit</div>
</div>