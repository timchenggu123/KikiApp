<script lang="ts">
    // import { asyncGetDecks } from "$lib/api/api";
    let front = $state("");
    let back = $state("");
    let currentDeck = $state("<Please Select A Deck>");
    const closeModal = () => {
        (document.getElementById("addCardModal") as HTMLDialogElement)?.close();
    }
    let decks = ["Deck 1", "Deck 2", "Deck 3", "Deck 4"]; // List of decks
    let selectedDeck = null; // Variable to store the selected deck

    function handleSelect(event:any) {
        selectedDeck = event.target.value;
    }
</script>

<div class="modal-box">
    <h3 class="text-lg font-bold pb-4">Adding a new card!</h3>
    <div class="flex flex-col gap-2 justify-start">
        <select id="deck-select" onchange={handleSelect} class="rounded-md bg-base-100">
            <option value="" disabled selected>-- Select a Deck --</option>
            {#each decks as deck}
              <option value={deck}>{deck}</option>
            {/each}
        </select>
        <textarea bind:value={front} placeholder="Front" class="border-none input h-full"></textarea>
        <textarea bind:value={back}  placeholder="Back"  class="border-none input h-full"></textarea>
        <div class="grid grid-cols-4 grap-3">
            <button class="btn col-start-1 bg-blue-700" onclick={closeModal}>Add</button>
            <button class="btn col-start-4" onclick={closeModal}>Close</button>
        </div>
    </div>
</div>