<script lang="ts">
    import { asyncGetDecks, asyncGetAddCardFromCard }from "$lib/api/api";
    import type { TypeDeck } from "$lib/api/types";
    import { onMount } from "svelte";
    
    let { id, curCardID, closeModal } = $props();
    let front = $state("");
    let back = $state("");
    // const closeModal = () => {
    //     (document.getElementById(id) as HTMLDialogElement)?.close();
    // }
    let decks: TypeDeck[] = $state([])// List of decks
    let selectedDeck: Number = -1; // Variable to store the selected deck
    function handleSelect(event:any) {
        selectedDeck = event.target.value;
    }
    let card_id: number = $state(-1);
    onMount(async () => {
        let res = await asyncGetDecks();
        decks = res;
    });

    async function addCard() {
        await asyncGetAddCardFromCard(selectedDeck, curCardID);
        closeModal();
    }
</script>

<dialog class="modal" id={id} open>
    <div class="modal-box">
        {#if curCardID == -1}
            <h3 class="text-lg font-bold pb-4">Please select a card first!</h3>
            <button class="btn bg-blue-700" onclick={closeModal}>Okay</button> 
        {/if}
        {#if curCardID != -1}
            <h3 class="text-lg font-bold pb-4">Adding the current card to</h3>
            <div class="flex flex-col gap-2 justify-start">
                <select id="deck-select" onchange={handleSelect} class="rounded-md bg-base-100">
                    <option value="" disabled selected>-- Select a Deck --</option>
                    {#each decks as deck}
                    <option value={deck.id}>{deck.name}</option>
                    {/each}
                </select>
                <div class="grid grid-cols-4 grap-3">
                    <button class="btn col-start-1 bg-blue-700" onclick={addCard}>Add</button>
                    <button class="btn col-start-4" onclick={closeModal}>Close</button>
                </div>
            </div>
        {/if}
    </div>
</dialog>