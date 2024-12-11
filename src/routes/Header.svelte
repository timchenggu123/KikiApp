<script lang="ts">
	import AddCard from "../components/AddCard.svelte";
	function showModal() {
		(document.getElementById("addCardModal") as HTMLDialogElement)?.showModal();
	}
	
</script>

<div class="py-4 grid grid-cols-5 gap-2">
	<a class="btn btn-md" href="/decks">Home</a>
	<button class="btn btn-md" onclick={showModal}>AddCard</button>
</div>
<dialog class="modal" id="addCardModal">
	<AddCard />
</dialog>
<style>
</style>
