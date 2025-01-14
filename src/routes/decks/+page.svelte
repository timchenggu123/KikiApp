<!-- src/DeckBrowser.svelte -->  
<script lang="ts">  
	import {asyncGetDeckConfig, asyncGetDecks, asyncPostAddDeck, asyncPostDeckConfig, asyncRemoveDeck} from "$lib/api/api"
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type {TypeDeck} from "$lib/api/types";
	import FileInput from "../../components/UploadDeck.svelte";
	import HomeTools from "../../components/HomeTools.svelte";

	
	let decks: TypeDeck[] = $state([]);
	let showConfig = $state(false);
	let selectedDid = $state(-1);
	let config: any = $state(undefined);

	onMount(async () => {
		const res:[TypeDeck] = await asyncGetDecks();
		decks = res;
	});
	async function selectDeck(deck:any) { 
		selectedDid = deck.id;
		config = await asyncGetDeckConfig(deck.id);
		if (config === undefined) {
			return;
		}
		console.log(config);
		showConfig = true;
	}

	function closeModal() {
		showConfig = false;
	}

	async function configDeck() {
		if (config === undefined) {
			return;
		}
		await asyncPostDeckConfig(selectedDid, config);
		closeModal();
	}

	async function deleteDeck() {
		const confirm = window.confirm("Are you sure you want to delete this deck?");
		if (confirm) {
			await asyncRemoveDeck(selectedDid);
		}
		// Close the modal
		closeModal();
		// Refresh the decks
		decks = await asyncGetDecks();
	}

	async function addNewDeck() {
		const name = window.prompt("Enter the name of the deck");
		if (name === null) {
			return;
		}
		await asyncPostAddDeck(name);
		// Refresh the decks
		decks = await asyncGetDecks();
	}

	async function showUploadModal(){
		const dialog = document.getElementById('uploadDeckMoal') as HTMLDialogElement;
		dialog.showModal();
		return;
	}
</script>  
<HomeTools/>
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div class="flex flex-row justify-between items-center px-2">
	<h2 class="p-2 text-2xl text-bold">All Decks</h2> 
	<!-- <button class="" ><p class="m-auto">+</p></button> -->
	<div class="dropdown dropdown-end">
		<div tabindex=-1 class="btn btn-circle btn-sm text-xl text-center"><p class="m-auto">+</p></div>
		<ul tabindex=-1 class="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
		  <li onclick={addNewDeck}><p>New</p></li>
		  <li onclick={showUploadModal}><p>Upload</p></li>
		</ul>
	</div>
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

{#if showConfig}
<dialog class="modal" id="configDeckModal" open>
    <div class="modal-box">
		<div class="flex flex-row justify-between">
			<h3 class="text-lg font-bold pb-4">Configuring Deck</h3>
			<a class="btn btn-sm btn-circle bg-red-500" onclick={deleteDeck}><p class="m-auto text-lg">🗑</p></a>
		</div>

        <div class="flex flex-col gap-2 justify-start">
			<div class="grid grid-cols-4"> 
				<p class="col-start-1">Study Order:</p>
                <select bind:value={config.new.order} class="select bg-base-300 w-full max-w-xs col-start-2">
					<option disabled selected>Auto</option>
					<option value={0}>Random</option>
					<option value={1}>Default</option>
				</select>
            </div>

            <div class="grid grid-cols-4"> 
				<p class="col-start-1">New:</p>
                <input type="number" placeholder="20" bind:value={config.new.perDay} class="input intput-bordered bg-base-300 w-full max-w-xs col-start-2">
            </div>

			<div class="grid grid-cols-4"> 
				<p class="col-start-1">Review:</p>
                <input type="number" placeholder="20" bind:value={config.rev.perDay} class="input intput-bordered bg-base-300 w-full max-w-xs col-start-2">
        	</div>
            <div class="grid grid-cols-4 grap-3">
                <button class="btn col-start-1 bg-blue-700" onclick={configDeck}>Confirm</button>
                <button class="btn col-start-4" onclick={closeModal}>Close</button>
            </div>
        </div>
    </div>
</dialog>
{/if}
<FileInput id="uploadDeckMoal" refreshDecks={async ()=>{decks = await asyncGetDecks();}}/>
</ul> 