<script lang="ts">
    import Card from "../../../components/Card.svelte";
    // import { getCard} from "$lib/dummy/adapter";
    import type { TypeCard } from '$lib/api/types';
	import { onMount } from "svelte";
    import { asyncGetStudy, asyncPostStudyAnswer } from "$lib/api/api";
    import { page } from '$app/stores';

    let card_data : TypeCard = $state({id:0, Front:"", Back:""});
    let side = $state(true);

    async function fetchCard(){
        const res = await asyncGetStudy(parseInt($page.params.did));
        console.log(res);
        card_data = res;
    }
    onMount(
        fetchCard
    );

    async function handleAnswer1(){
        const time =  Date.now()/1000
        const res = await asyncPostStudyAnswer(card_data.id, 1, time);
        await fetchCard();
    }
    async function handleAnswer2(){
        const time =  Date.now()/1000
        const res = await asyncPostStudyAnswer(card_data.id, 2, time);
        await fetchCard();
    }
    async function handleAnswer3(){
        const time =  Date.now()/1000
        const res = await asyncPostStudyAnswer(card_data.id, 3, time);
        await fetchCard();
    }
    async function handleAnswer4(){
        const time =  Date.now()/1000
        const res = await asyncPostStudyAnswer(card_data.id, 4, time);
        await fetchCard();
    }
</script>

<div class="w-full h-5 rounded-md bg-slate-700 mb-4 shadow-xl border-b-2 border-b-slate-500 flex gap-4 px-4">
    <div class="text-sm">New:</div>
    <div class="text-sm">Learning:</div>
    <div class="text-sm">Review:</div>
</div>
<Card {...card_data}/>
<div class="m-0 p-3 w-full mb-20">
    <div class="grid grid-cols-4 gap-4">
        <button class="btn shadow-xl bg-red-700" onclick={handleAnswer1}>Again</button>
        <button class="btn shadow-xl bg-orange-700" onclick={handleAnswer2}>Hard</button>
        <button class="btn shadow-xl bg-green-700" onclick={handleAnswer3}>Okay</button>
        <button class="btn shadow-xl bg-blue-700" onclick={handleAnswer4}>Easy</button>
    </div>
</div>

