<script lang="ts">
    import Header from '../Header.svelte';
	let { children } = $props();
</script>

<div class="h-screen max-w-[30rem] m-auto">
	<div class="flex flex-col h-full px-10">
    <Header />
		{@render children()}
    </div>

</div>

<style></style>