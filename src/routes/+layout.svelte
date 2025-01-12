<script lang="ts">
	import { draw } from 'svelte/transition';
	import '../app.css';
	import MainDrawer from '../components/MainDrawer.svelte';
	let {children } = $props();
	let drawerOpen = $state(false);
</script>

<div >
	<main>
		<div class={"drawer drawer-end"}>
			<input id="my-drawer-2" type="checkbox" class="drawer-toggle" bind:checked={drawerOpen}/>
			<div class="drawer-content">
				{@render children()}
			</div>
			<div class="drawer-side">
				<label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
				<MainDrawer closeDrawer={()=>{drawerOpen = !drawerOpen}}/>
			</div>
		</div>
	</main>

</div>

<style>
</style>
