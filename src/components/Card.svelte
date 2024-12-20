<script lang="ts">
    import {SERVER_URL} from "$lib/api/common";
    let side = $state(true);
    let card_data = $props();

    const base_element = `<base href="${SERVER_URL}/media/" />`;
    // This is used by generated code, so it needs to be a top-level variable
    //compile card front and back as svelte components
    
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="rounded-box gradient-div min-h-[40rem] shadow-xl border-b-2 border-b-zinc-500 overflow-y-auto">
    <div class={"relative rounded-box !nightMode card-compact h-full w-full bg-gray-200 backdrop-blur-xl flex flex-col " + (side ? "bg-opacity-80" : "bg-opacity-90")} onclick={()=>{side=!side}}>
        <!-- <audio src={`${SERVER_URL}/card/${card_data.cid}/back/audio`} class={`p-1 h-[3rem] ` + (side ? `hidden` : ``)} controls></audio>
        <audio src={`${SERVER_URL}/card/${card_data.cid}/front/audio`} class={`p-1 h-[3rem] ` + (side ? `` : `hidden`)} controls></audio> -->
        <div class="flex-grow w-full">
            <iframe title="card_front" class={"text-xl min-h-full w-full " + (side ? `` : `hidden`)} srcdoc={base_element + card_data.Front}>
                <!-- {@html card_data ? card_data.Front : `Non-existent`}  -->
            </iframe>
            <iframe title="card_back" class={`text-xl min-h-full w-full ` + (side ? `hidden` : ``)} srcdoc={base_element + card_data.Back}>
                <!-- {@html card_data ? card_data.Back : `Non-existent`}  -->
                {@html card_data.Back}
            </iframe>
        </div>
        <div class="h-10 w-full text-center text-lg pt-1">Click to flip</div>
    </div>
</div>

<style>
    .gradient-div {
	background: radial-gradient(
		circle 10rem at 25% 30%, 
		rgba(116, 106, 182, 0.699), 
		transparent
	  ),
	  radial-gradient(
		circle 10rem at 80% 75%, 
		rgba(238, 234, 5, 0.916), 
		transparent
	  );   
}
</style>