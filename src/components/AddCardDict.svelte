<script lang="ts">
    import { asyncGetDecks, asyncPostAddCardDict }from "$lib/api/api";
    import type { TypeDeck } from "$lib/api/types";
	import { asyncQueryWordRaw, parseRaw } from "$lib/dict/dictionaryApiDev";
    import { onMount } from "svelte";
    let { id, curDeck, closeModal } = $props();
    let queryWord = $state("");

    // Dictionary API
    let fields:any = $state({});

    let decks: TypeDeck[] = $state([])// List of decks
    onMount(async () => {
        let res = await asyncGetDecks();
        decks = res;
    });
    async function addCard() {
        if (!fields.word) {
            alert("Please search for a word first!");
            return;
        }
        try{
            await asyncPostAddCardDict(curDeck, fields);
            alert("Card added successfully!");
        }catch(e: any){
            alert("Failed to add card. Please try again later.");
            console.log(e);
        }
        closeModal();
    }
    async function searchWord() {
        const raw = await asyncQueryWordRaw(queryWord);
        const res = parseRaw(raw)
        fields.word = res.word;
        fields.origin = res.origin ? res.origin : "";
        fields.phonetic = res.phonetic ? res.phonetic : "";
        fields.meanings_text = res.meanings.join("<br/><br/>");
        fields.audio = res.audio;
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
            {#if fields.word}
            <div class="rounded-lg shadow-xl, bg-base-200 p-5 flex flex-col items-center gap-2 max-h-[30rem] overflow-scroll">
                <h1 class="font-bold text-2xl">{fields.word}</h1>
                <h2>{fields.origin}</h2>
                <h3>{fields.phonetic}</h3>
                <div class="h-fit">
                    <audio src={fields.audio} controls></audio>
                </div>
                <p>{@html fields.meanings_text}</p>
            </div>
            {/if}

            <div class="grid grid-cols-4 grap-3">
                <button class="btn col-start-1 bg-blue-700" onclick={addCard}>Add</button>
                <button class="btn col-start-4" onclick={closeModal}>Close</button>
            </div>
        </div>
    </div>
</dialog>