<script lang="ts">
    let AddCardFromRaw: any|undefined= $state(undefined);
    let AddCardFromCurrent: any|undefined = $state(undefined);
    let AddCardDict: any|undefined = $state(undefined);

    let {curCardID, curDeck} = $props();
    let addCardRawId = "addCardRawModal";
    let addCardFromId = "addCardFromModal";
    let addCardDictId = "addCardDictModal";
    let showAddMenu = $state(false);

    let modal1Open = $state(false);
    let modal2Open = $state(false);
    let modal3Open = $state(false);

	async function showModal1() {
        showAddMenu = false;
        const module = await import("./AddCardRaw.svelte");
        AddCardFromRaw = module.default;
		modal1Open = true;
	}
	async function showModal2() {
        showAddMenu = false;
        const module = await import("./AddCardFromCurrent.svelte");
        AddCardFromCurrent = module.default;
        modal2Open = true;
	}
    async function showModal3() {
        showAddMenu = false;
	    const module = await import("./AddCardDict.svelte");
        AddCardDict = module.default;
        modal3Open = true;
	}
</script>
<div class={"dropdown" + (showAddMenu?" dropdown-open":"")}>
    <div onclick={()=>{showAddMenu = !showAddMenu}} role="button" class="btn btn-circle"><p class="m-auto text-2xl">+</p></div>
    <ul class="dropdown-content menu bg-base-100 rounded-box z-[50] w-52 p-2 shadow">
        <li><a onclick={showModal1}>Raw</a></li>
        <li><a onclick={showModal2}>Current</a></li>
        <li><a onclick={showModal3}>Word</a></li>
    </ul>
    <div class={"fixed left-0 top-0 h-screen w-screen z-[49]" + (showAddMenu?" ":" hidden")} onclick={()=>{showAddMenu = !showAddMenu}}></div>
</div>
{#if modal1Open && AddCardFromRaw}
<AddCardFromRaw id={addCardRawId} closeModal={()=>{modal1Open=false}}/>
{/if}
{#if modal2Open && AddCardFromCurrent}
<AddCardFromCurrent id={addCardFromId} curCardID={curCardID} closeModal={()=>{modal2Open=false}}/>
{/if}
{#if modal3Open && AddCardDict}
<AddCardDict id={addCardDictId} curDeck={curDeck} closeModal={()=>modal3Open=false}/>
{/if}