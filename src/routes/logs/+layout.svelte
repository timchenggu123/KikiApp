<script lang="ts">
	let { children } = $props();
</script>

<div class=" max-w-[30rem] w-full m-auto h-screen">
	<div class="flex flex-col px-4 h-full">
		{@render children()}
    </div>

</div>
