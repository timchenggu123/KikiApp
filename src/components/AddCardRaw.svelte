<script lang="ts">
    import { asyncGetDecks, asyncPostAddCardRaw }from "$lib/api/api";
    import type { TypeDeck } from "$lib/api/types";
    import { onMount } from "svelte";
    let { id } = $props();
    let front = $state("");
    let back = $state("");
    const closeModal = () => {
        (document.getElementById(id) as HTMLDialogElement)?.close();
    }
    let decks: TypeDeck[] = $state([])// List of decks
    onMount(async () => {
        let res = await asyncGetDecks();
        decks = res;
    });
    let selectedDeck: Number = -1; // Variable to store the selected deck
    function handleSelect(event:any) {
        selectedDeck = event.target.value;
    }
    async function addCard() {
        await asyncPostAddCardRaw(selectedDeck, front, back);
        closeModal();
    }
</script>

<dialog class="modal" id={id}>
    <div class="modal-box">
        <h3 class="text-lg font-bold pb-4">Adding a new card!</h3>
        <div class="flex flex-col gap-2 justify-start">
            <select id="deck-select" onchange={handleSelect} class="rounded-md bg-base-100">
                <option value="" disabled selected>-- Select a Deck --</option>
                {#each decks as deck}
                <option value={deck.id}>{deck.name}</option>
                {/each}
            </select>
            <textarea bind:value={front} placeholder="Front" class="border-gray-600 input h-full"></textarea>
            <textarea bind:value={back}  placeholder="Back"  class="border-gray-600 input h-full"></textarea>
            <div class="grid grid-cols-4 grap-3">
                <button class="btn col-start-1 bg-blue-700" onclick={addCard}>Add</button>
                <button class="btn col-start-4" onclick={closeModal}>Close</button>
            </div>
        </div>
    </div>
</dialog>