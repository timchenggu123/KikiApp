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
    let cur_card_id = $state(-1);
    let ready = $state(false);
    
    let setCurCardId = (id:number) => {
        cur_card_id = id;
    }

    async function fetchCard(){
        const res = await asyncGetStudy(parseInt($page.params.did));
        card_data = res.card;
        setCurCardId(card_data.cid);
        console.log(card_data);
        unknown = res.counts.new;
        learning = res.counts.learning;
        review = res.counts.review;
        ready = true;
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
<CardTools cur_card_id={cur_card_id}/>
<div class="w-full h-5 rounded-md bg-slate-700 mb-4 shadow-xl border-b-2 border-b-slate-500 flex gap-4 px-4">
    <div class="text-sm">New:{unknown}</div>
    <div class="text-sm">Learning:{learning}</div>
    <div class="text-sm">Review:{review}</div>
</div>
{#if ready}
<Card {...card_data}/>
{/if}
<div class="m-0 p-3 w-full mb-20">
    <div class="grid grid-cols-4 gap-4">
        <button class="btn shadow-xl bg-red-700 border-b-2 border-red-500" onclick={handleAnswer1}>Again</button>
        <button class="btn shadow-xl bg-orange-700 border-b-2 border-orange-500" onclick={handleAnswer2}>Hard</button>
        <button class="btn shadow-xl bg-green-700 border-b-2 border-green-500" onclick={handleAnswer3}>Okay</button>
        <button class="btn shadow-xl bg-blue-700 border-b-2 border-blue-500" onclick={handleAnswer4}>Easy</button>
    </div>
</div>

