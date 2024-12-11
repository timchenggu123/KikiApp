<script lang="ts">
    let side = $state(true);
    let card_data = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={()=>{side=!side}} class="card card-compact gradient-div h-full max-h-[30rem] shadow-xl border-b-2 border-b-zinc-500">
    <div class={"card card-compact h-full max-h-[30rem] bg-zinc-700 backdrop-blur-xl overflow-hidden " + (side ? "bg-opacity-80" : "bg-opacity-90")}>
        <div class={"text-xl m-auto p-10 " + (side ? `` : `hidden`)}>
            {card_data ? card_data.Front : `Non-existent`} 
        </div>
        <div class={`text-xl m-auto p-10 ` + (side ? `hidden` : ``)}>
            {card_data ? card_data.Back : `Non-existent`} 
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