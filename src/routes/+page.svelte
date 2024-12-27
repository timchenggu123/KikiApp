<script lang="ts">
	import kiki_logo from "$lib/images/kiki_logo.png"
	
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="flex flex-col justify-center items-center p-10 gap-5 max-w-[30rem] m-auto h-screen">
	<img class="max-h-[15rem] max-w-[15rem]" src={kiki_logo} alt="logo"/>
	<h1 class="text-2xl font-bold">Welcome to Kiki!</h1>
	<p class="text-lg">The flashcard app based on Anki</p>
	<a href={`/decks`} class="btn bg-blue-700 max-w-40">Click here to login</a>
</div>

<style>
</style>
