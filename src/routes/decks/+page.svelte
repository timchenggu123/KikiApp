<!-- src/DeckBrowser.svelte -->  
<script lang="ts">  
	import {asyncGetDeckConfig, asyncGetDecks, asyncPostAddDeck, asyncPostDeckConfig, asyncRemoveDeck} from "$lib/api/api"
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type {TypeDeck} from "$lib/api/types";

	
	let decks: TypeDeck[] = $state([]);
	let new_number = $state(20);
	let review_number = $state(200);
	let selectedDid = $state(-1);
	let config: any = $state(undefined);

	onMount(async () => {
		const res:[TypeDeck] = await asyncGetDecks();
		decks = res;
		console.log(res);
	});
	async function selectDeck(deck:any) { 
		selectedDid = deck.id;
		config = await asyncGetDeckConfig(deck.id);
		console.log(config);
		if (config === undefined) {
			console.log("No config found");
			return;
		}
		new_number = config.new.perDay;
		review_number = config.rev.perDay;
		const dialog = document.getElementById('configDeckModal') as HTMLDialogElement;
		dialog.showModal();
	}

	function closeModal() {
		const dialog = document.getElementById('configDeckModal') as HTMLDialogElement;
		dialog.close();
	}

	async function configDeck() {
		console.log(selectedDid, new_number, review_number);
		if (config === undefined) {
			console.log("No config found");
			return;
		}
		config.new.perDay = new_number;
		config.rev.perDay = review_number;
		await asyncPostDeckConfig(selectedDid, config);
		closeModal();
	}

	async function deleteDeck() {
		console.log(selectedDid);
		const confirm = window.confirm("Are you sure you want to delete this deck?");
		if (confirm) {
			await asyncRemoveDeck(selectedDid);
		}
		// Close the modal
		closeModal();
		// Refresh the decks
		decks = await asyncGetDecks();
	}

	async function addDeck() {
		const name = window.prompt("Enter the name of the deck");
		if (name === null) {
			return;
		}
		await asyncPostAddDeck(name);
		// Refresh the decks
		decks = await asyncGetDecks();
	}
</script>  
<div class="flex flex-row justify-between items-center px-2">
	<h2 class="p-2 text-2xl text-bold">All Decks</h2> 
	<button class="btn btn-circle btn-sm text-xl text-center" onclick={addDeck}><p class="m-auto">+</p></button>
</div>	
<ul class="menu bg-base-200 rounded-box w-full max-w-[30rem]">  
{#each decks as deck}
	<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
		<div class="flex justify-end">
			<a class="flex flex-grow h-full align-middle flex-wrap" href={`/study/`+ deck.id}>{deck.name}</a>
			<a class="btn-circle btn-sm text-2xl text-center" href={`/decks/` + deck.id}>👓</a>
			<a class="btn-circle btn-sm text-2xl text-center" onclick={()=>{selectDeck(deck)}}>⚙</a>
		</div> 
	</li>
{/each}

<dialog class="modal" id="configDeckModal">
    <div class="modal-box">
		<div class="flex flex-row justify-between">
			<h3 class="text-lg font-bold pb-4">Configuring Deck</h3>
			<a class="btn btn-sm btn-circle bg-red-500" onclick={deleteDeck}><p class="m-auto text-lg">🗑</p></a>
		</div>

        <div class="flex flex-col gap-2 justify-start">
            <div class="grid grid-cols-4"> 
				<p class="col-start-1">New:</p>
                <input type="number" placeholder="20" bind:value={new_number} class="input intput-bordered bg-base-300 w-full max-w-xs col-start-2">
            </div>

			<div class="grid grid-cols-4"> 
				<p class="col-start-1">Review:</p>
                <input type="number" placeholder="20" bind:value={review_number} class="input intput-bordered bg-base-300 w-full max-w-xs col-start-2">
        	</div>
            <div class="grid grid-cols-4 grap-3">
                <button class="btn col-start-1 bg-blue-700" onclick={configDeck}>Confirm</button>
                <button class="btn col-start-4" onclick={closeModal}>Close</button>
            </div>
        </div>
    </div>
</dialog>

</ul> 