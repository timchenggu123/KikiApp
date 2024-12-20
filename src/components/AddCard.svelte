<script lang="ts">
    import AddCardFromRaw from "./AddCardRaw.svelte";
    import AddCardFromCurrent from "./AddCardFromCurrent.svelte";
	import AddCardDict from "./AddCardDict.svelte";
    let {cur_card_id} = $props();
    let addCardRawId = "addCardRawModal";
    let addCardFromId = "addCardFromModal";
    let addCardDictId = "addCardDictModal";
	function showModal1() {
		(document.getElementById(addCardRawId) as HTMLDialogElement)?.showModal();
	}
	function showModal2() {
		(document.getElementById(addCardFromId) as HTMLDialogElement)?.showModal();
	}
    function showModal3() {
		(document.getElementById(addCardDictId) as HTMLDialogElement)?.showModal();
	}
</script>
<div class="dropdown">
<div tabindex="0" role="button" class="btn btn-outline w-full">Add</div>
    <ul tabindex=-1 class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        <li><a onclick={showModal1}>Raw</a></li>
        <li><a onclick={showModal2}>Current</a></li>
        <li><a onclick={showModal3}>Word</a></li>
    </ul>
    <AddCardFromRaw id={addCardRawId}/>
    <AddCardFromCurrent id={addCardFromId} cur_card_id={cur_card_id}/>
    <AddCardDict id={addCardDictId}/>
</div>