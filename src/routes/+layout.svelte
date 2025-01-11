<script lang="ts">
	import '../app.css';
	let {children } = $props();
</script>

<div >
	<main>
		<div class="drawer drawer-end">
			<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
			<div class="drawer-content">
				{@render children()}
			</div>
			<div class="drawer-side">
				<label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
				<ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
				  <!-- Sidebar content here -->
				  <li><a href="/decks">Decks</a></li>
				  <li><a>Sidebar Item 2</a></li>
				</ul>
			</div>
		</div>
	</main>

</div>

<style>
</style>
