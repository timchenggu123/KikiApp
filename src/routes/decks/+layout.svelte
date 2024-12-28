<script lang="ts">
	let { children } = $props();
</script>

<div class=" max-w-[30rem] w-full m-auto">
	<div class="flex flex-col px-4">
		{@render children()}
    </div>

</div>
<style></style>