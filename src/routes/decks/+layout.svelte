<script lang="ts">
    import Header from '../Header.svelte';
	let { children } = $props();
</script>

<div class=" max-w-[30rem] w-full m-auto">
	<div class="flex flex-col px-4">
    <!-- <Header /> -->
		{@render children()}
    </div>

</div>
<style></style>