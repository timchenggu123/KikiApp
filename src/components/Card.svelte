<script lang="ts">
    import {SERVER_URL} from "$lib/api/common";
    let side = $state(true);
    let card_data = $props();
    // This is used by generated code, so it needs to be a top-level variable
    //compile card front and back as svelte components
    
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={()=>{side=!side}} class="card card-compact gradient-div h-full max-h-[30rem] shadow-xl border-b-2 border-b-zinc-500">
    <div class={"!card !nightMode card-compact flex flex-col items-center h-full w-full max-h-[30rem] bg-gray-200 backdrop-blur-xl " + (side ? "bg-opacity-80" : "bg-opacity-90")}>
        <audio src={`${SERVER_URL}/card/${card_data.cid}/back/audio`} class={`p-1 h-[3rem] ` + (side ? `hidden` : ``)} controls></audio>
        <audio src={`${SERVER_URL}/card/${card_data.cid}/front/audio`} class={`p-1 h-[3rem] ` + (side ? `` : `hidden`)} controls></audio>
        <div class={"text-xl m-auto p-10 !bg-transparent overflow-hidden " + (side ? `` : `hidden`)}>
            <!-- {@html card_data ? card_data.Front : `Non-existent`}  -->
            {@html card_data.Front}
        </div>
        <div class={`text-xl m-auto p-10 overflow-hidden ` + (side ? `hidden` : ``)}>
            <!-- {@html card_data ? card_data.Back : `Non-existent`}  -->
            {@html card_data.Back}
        </div>
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