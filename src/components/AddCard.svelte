<script lang="ts">
    let AddCardFromRaw: any|undefined= $state(undefined);
    let AddCardFromCurrent: any|undefined = $state(undefined);
    let AddCardDict: any|undefined = $state(undefined);

    let {curCardID, curDeck} = $props();
    let addCardRawId = "addCardRawModal";
    let addCardFromId = "addCardFromModal";
    let addCardDictId = "addCardDictModal";

    let modal1Open = $state(false);
    let modal2Open = $state(false);
    let modal3Open = $state(false);

	async function showModal1() {
        const module = await import("./AddCardRaw.svelte");
        AddCardFromRaw = module.default;
		modal1Open = true;
	}
	async function showModal2() {
        const module = await import("./AddCardFromCurrent.svelte");
        AddCardFromCurrent = module.default;
        modal2Open = true;
	}
    async function showModal3() {
	    const module = await import("./AddCardDict.svelte");
        AddCardDict = module.default;
        modal3Open = true;
	}
</script>
<div class="dropdown">
<div tabindex="0" role="button" class="btn btn-circle"><p class="m-auto text-2xl">+</p></div>
    <ul tabindex=-1 class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        <li><a onclick={showModal1}>Raw</a></li>
        <li><a onclick={showModal2}>Current</a></li>
        <li><a onclick={showModal3}>Word</a></li>
    </ul>

    {#if modal1Open && AddCardFromRaw}
        <AddCardFromRaw id={addCardRawId} closeModal={()=>{modal1Open=false}}/>
    {/if}
    {#if modal2Open && AddCardFromCurrent}
        <AddCardFromCurrent id={addCardFromId} curCardID={curCardID} closeModal={()=>{modal2Open=false}}/>
    {/if}
    {#if modal3Open && AddCardDict}
        <AddCardDict id={addCardDictId} curDeck={curDeck} closeModal={()=>modal3Open=false}/>
    {/if}
</div>