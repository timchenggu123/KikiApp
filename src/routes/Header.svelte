<script lang="ts">
	import AddCard from "../components/AddCard.svelte";
	function showModal() {
		(document.getElementById("addCardModal") as HTMLDialogElement)?.showModal();
	}
	
</script>

<div class="py-4">
	<a class="btn btn-sm" href="/decks">⌂ Home</a>
	<button class="btn btn-sm" onclick={showModal}>Add</button>
</div>
<dialog class="modal" id="addCardModal">
	<AddCard />
</dialog>
<style>
</style>
