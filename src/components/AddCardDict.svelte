<script lang="ts">
    import { asyncGetDecks, asyncPostAddCardRaw }from "$lib/api/api";
    import type { TypeDeck } from "$lib/api/types";
	import { asyncQueryWordRaw, parseRaw } from "$lib/dict/dictionaryApiDev";
    import { onMount } from "svelte";
    let { id } = $props();
    let front = $state("");
    let back = $state("");
    let queryWord = $state("");

    // Dictionary API
    let word = $state("");
    let origin = $state("");
    let phonetic = $state("");
    let meanings_text = $state("");
    let audio = $state("");

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
        console.log(selectedDeck);
    }
    async function addCard() {
        await asyncPostAddCardRaw(selectedDeck, front, back);
        closeModal();
    }
    async function searchWord() {
        // const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${queryWord}`);
        // const data = await res.json();
        // console.log(data);
        // definition = data[0].meanings[0].definitions[0].definition;

        const raw = await asyncQueryWordRaw(queryWord);
        const res = parseRaw(raw)
        word = res.word;
        origin = res.origin;
        phonetic = res.phonetic;
        meanings_text = res.meanings;
        audio = res.audio;
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
            
            <div class="flex flex-row w-full justify-center p-2 gap-1"> 
                <input type="text" placeholder="Search Word" bind:value={queryWord} class="input intput-bordered bg-base-300 w-full max-w-xs">
                <button class="btn bg-blue-700" onclick={searchWord}>Search</button>
            </div>
            {#if word}
            <div class="rounded-lg shadow-xl, bg-base-200 p-5 flex flex-col items-center gap-2 max-h-[30rem] overflow-hidden">
                <h1>{word}</h1>
                <h2>{origin}</h2>
                <h3>{phonetic}</h3>
                {#each meanings_text as meaning}
                    <p>{meaning}</p>
                {/each}
                <audio src={audio} controls></audio>
            </div>
            {/if}

            <div class="grid grid-cols-4 grap-3">
                <button class="btn col-start-1 bg-blue-700" onclick={addCard}>Add</button>
                <button class="btn col-start-4" onclick={closeModal}>Close</button>
            </div>
        </div>
    </div>
</dialog>