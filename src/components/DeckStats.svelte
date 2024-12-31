<script lang="ts">
	import { asyncGetDeckStats } from "$lib/api/api";
	import { onMount } from "svelte";

    let {did, close} = $props();
    let stats = $state({mature: 0, young: 0, unseen: 0, suspended: 0, count: 0, unique: 0});
    let ready = $state(false);
    onMount(async () => {
        ready = false;
        asyncGetDeckStats(did).then((res) => {
            stats = res;
            ready = true;
        }).finally(() => {
            ready = true;
        });
    });

    const toPercent = (num: number, total: number) => {
        return ((num / total) * 100).toFixed(2);
    }
</script>

<dialog class="modal" open>
    <div class="modal-box">
        <div class="flex justify-between items-center w-full mb-4">
            <p class="text-2xl font-bold">Study Stats</p>
            <button class="btn btn-circle" onclick={close}><p class="m-auto">✕</p></button>
        </div>
        {#if ready}
        <div>
            <div class="w-full max-w-60">
                <div class="flex flex-row justify-between">
                    <p>Learned: </p><p>{stats.mature}{` (`+ toPercent(stats.mature, stats.count) +`%)`}</p>
                </div>
                <div class="flex flex-row justify-between">
                    <p>Learning: </p><p>{stats.young}{` (`+ toPercent(stats.young, stats.count) +`%)`}</p>
                </div>
                <div class="flex flex-row justify-between">
                    <p>Suspended: </p><p>{stats.suspended}{` (`+ toPercent(stats.suspended, stats.count) +`%)`}</p>
                </div>
                <div class="flex flex-row justify-between">
                    <p>Remaining: </p><p>{stats.unseen}{` (`+ toPercent(stats.unseen, stats.count) +`%)`}</p>
                </div>
                <div class="flex flex-row justify-between">
                    <p>Total Cards: </p><p>{stats.count}</p>
                </div>
                <div class="flex flex-row justify-between">
                    <p>Total Notes: </p><p>{stats.unique}</p>
                </div>
            </div>
        </div>
        {:else}
        <div>
            <p>Loading<span class="loading loading-dots loading-md"></span></p>
        </div>
        {/if}

    </div>
</dialog>
