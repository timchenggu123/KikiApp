<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div >
	<!-- <Header /> -->

	<main>
		{@render children()}
	</main>

</div>

<style>
</style>
