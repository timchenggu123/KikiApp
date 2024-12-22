<script lang="ts">
	import { asyncPostUploadDeck } from "$lib/api/api";

    let {id, refreshDecks} = $props();
    let files: FileList|undefined = $state();
    function closeModal() {
        files= undefined;
        (document.getElementById(id) as HTMLDialogElement)?.close();
    }

    async function uploadDeck() {
        console.log(files);
        if (files === undefined) {
            return;
        }
        let file = files[0];

        (document.getElementById(id) as HTMLDialogElement)?.close();
        (document.getElementById("loading") as HTMLDialogElement)?.showModal();
        await asyncPostUploadDeck(file);
        closeModal();
        files= undefined;
        (document.getElementById("loading") as HTMLDialogElement)?.close();
        refreshDecks();
    }
</script>

<dialog class="modal" id={id}>
    <div class="modal-box">
        <h3 class="text-lg font-bold pb-4">Upload a deck</h3>
        <div class="flex items-center justify-center w-full">
            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">.apkg (Anki package files)</p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" bind:files={files}>
            </label>
        </div>
        <div>
            {#if files}
            {#each files as file}
                <p>{file.name}</p>
            {/each}
            {/if}
        </div>
        <div class="grid grid-cols-4 grap-3 mt-4">
            <button class="btn col-start-1 bg-blue-700" onclick={uploadDeck}>Upload</button>
            <button class="btn col-start-4" onclick={closeModal}>Close</button>
        </div>
    </div>
</dialog>

<dialog class="modal" id="loading">
    <div class="modal-box">
        <h3 class="text-lg font-bold pb-4">Uploading...</h3>
        <span class="loading loading-dots loading-md"></span>
    </div>
</dialog>