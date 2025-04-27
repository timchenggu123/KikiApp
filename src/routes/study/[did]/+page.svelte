<script lang="ts">
    import Card from "../../../components/Card.svelte";
    import type { TypeCard } from '$lib/api/types';
	import { onMount } from "svelte";
    import { asyncGetStudy, asyncPostStudyAnswer } from "$lib/api/api";
    import { page } from '$app/stores';
	import CardTools from "../../../components/CardTools.svelte";

    let card_data : TypeCard = $state({cid:0, Front:"", Back:"", Media:""});
    let unknown = $state(0);
    let learning = $state(0);
    let review = $state(0);
    let again_interval = $state("");
    let hard_interval = $state("");
    let okay_interval = $state("");
    let easy_interval = $state("");
    let curCardID = $state(-1);
    let ready = $state(false);
    let did = $state(-1);
    let no_card = $state(false);
    
    let setCurCardId = (id:number) => {
        curCardID = id;
    }

    async function fetchCard(){
        did = parseInt($page.params.did);
        ready = false;
        try{
            const res = await asyncGetStudy(did);
            card_data = res.card;
            setCurCardId(card_data.cid);
            unknown = res.counts.new;
            learning = res.counts.learning;
            review = res.counts.review;
            again_interval = res.intervals.again;
            hard_interval = res.intervals.hard;
            okay_interval = res.intervals.okay;
            easy_interval = res.intervals.easy;
        }catch (e: any){
            unknown = 0;
            learning = 0;
            review = 0;
            again_interval = "";
            hard_interval = "";
            okay_interval = "";
            easy_interval = "";
            no_card = true;
        }finally{
            ready = true;
        }
    }
    onMount(
        fetchCard
    );

    async function handleAnswer1(){
        const time =  Date.now()/1000
        const res = await asyncPostStudyAnswer(card_data.cid, 1, time);
        await fetchCard();
    }
    async function handleAnswer2(){
        const time =  Date.now()/1000
        const res = await asyncPostStudyAnswer(card_data.cid, 2, time);
        await fetchCard();
    }
    async function handleAnswer3(){
        const time =  Date.now()/1000
        const res = await asyncPostStudyAnswer(card_data.cid, 3, time);
        await fetchCard();
    }
    async function handleAnswer4(){
        const time =  Date.now()/1000
        const res = await asyncPostStudyAnswer(card_data.cid, 4, time);
        await fetchCard();
    }
</script>
<CardTools curCardID={curCardID} curDeck={did}/>
<div class="w-full h-5 rounded-md bg-slate-700 mb-4 shadow-xl border-b-2 border-b-slate-500 border-r-2 border-r-slate-500 flex gap-4 px-4">
    <div class="text-sm">New:{unknown}</div>
    <div class="text-sm">Learning:{learning}</div>
    <div class="text-sm">Review:{review}</div>
</div>
{#if !no_card}
<Card card_data={card_data}/>
{/if}
{#if no_card}
<div class="h-full max-h-35 w-full flex justify-center items-center">
    <p class="text-2xl">🎉 Wowww！You have done it all! Go treat yourself~ 🎉</p>
</div>
{/if}
<div class=" p-3 w-full mb-7">
    <div class="grid grid-cols-4 gap-4">
        <button class="btn shadow-xl bg-red-700 border-b-4 border-r-4 border-red-900 flex flex-col justify-center item-center gap-0" onclick={handleAnswer1}>
            <p class="text-sm text-white">Again</p>
            <p class="text-sm font-light">({again_interval})</p>
        </button>
        <button class="btn shadow-xl bg-orange-700 border-b-4 border-r-4 border-orange-900  flex flex-col justify-center item-center gap-0" onclick={handleAnswer2}>
            <p class="text-sm text-white">Hard</p>
            <p class="text-sm font-light">({hard_interval})</p>
        </button>
        <button class="btn shadow-xl bg-green-700 border-b-4 border-r-4 border-green-900  flex flex-col justify-center item-center gap-0" onclick={handleAnswer3}>
            <p class="text-sm text-white">Okay</p>
            <p class="text-sm font-light">({okay_interval})</p>
        </button>
        <button class="btn shadow-xl bg-blue-700 border-b-4 border-r-4 border-blue-900 flex flex-col justify-center item-center gap-0" onclick={handleAnswer4}>
            <p class="text-sm text-white">Easy</p>
            <p class="text-sm font-light">({easy_interval})</p>
        </button>
    </div>
</div>
{#if !ready}
<dialog class="modal" id="loadingModal" open>
    <div class="modal-box w-52 h-52 flex flex-col justify-center items-center">
        <span class="loading loading-spinner loading-lg"></span>
    </div>
</dialog>
{/if}

