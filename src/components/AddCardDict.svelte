<script lang="ts">
    import { asyncGetDecks, asyncPostAddCardRaw }from "$lib/api/api";
    import type { TypeDeck } from "$lib/api/types";
	import { asyncQueryWordRaw, parseRaw } from "$lib/dict/dictionaryApiDev";
    import { onMount } from "svelte";
    let { id, curDeck, closeModal } = $props();
    let front = $state("");
    let back = $state("");
    let queryWord = $state("");

    // Dictionary API
    let word = $state("");
    let origin = $state("");
    let phonetic = $state("");
    let meanings = $state([""]);
    let audio = $state("");
    let meanings_text = $state("");

    let decks: TypeDeck[] = $state([])// List of decks
    onMount(async () => {
        let res = await asyncGetDecks();
        decks = res;
    });
    async function addCard() {
        await asyncPostAddCardRaw(curDeck, front, back);
        closeModal();
    }
    async function searchWord() {
        const raw = await asyncQueryWordRaw(queryWord);
        const res = parseRaw(raw)
        word = res.word;
        origin = res.origin;
        phonetic = res.phonetic;
        meanings = res.meanings;
        meanings_text = meanings.join("<br/>");
        audio = res.audio;
        
        front = `${word}<br/>${phonetic}\n<div class="flex flex-row justify-center"><audio src=${audio} controls></audio></div>`;
        back = `${meanings_text}`;
    }
</script>

<dialog class="modal" id={id} open>
    <div class="modal-box">
        <h3 class="text-lg font-bold pb-4">Adding a new card!</h3>
        <div class="flex flex-col gap-2 justify-start">
            <div class="flex flex-row w-full justify-center p-2 gap-1"> 
                <input type="text" placeholder="Search Word" bind:value={queryWord} class="input intput-bordered bg-base-300 w-full max-w-xs">
                <button class="btn bg-blue-700" onclick={searchWord}>Search</button>
            </div>
            {#if word}
            <div class="rounded-lg shadow-xl, bg-base-200 p-5 flex flex-col items-center gap-2 max-h-[30rem] overflow-hidden">
                <h1>{word}</h1>
                <h2>{origin}</h2>
                <h3>{phonetic}</h3>
                <audio src={audio} controls></audio>
                {#each meanings as meaning}
                    <p>{meaning}</p>
                {/each}
            </div>
            {/if}

            <div class="grid grid-cols-4 grap-3">
                <button class="btn col-start-1 bg-blue-700" onclick={addCard}>Add</button>
                <button class="btn col-start-4" onclick={closeModal}>Close</button>
            </div>
        </div>
    </div>
</dialog>