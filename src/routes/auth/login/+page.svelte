<!-- basic login page -->
 
<script lang="ts">
    import { login } from '$lib/api/auth';
    import { goto } from '$app/navigation';
    import { writable } from 'svelte/store';

    let user = $state('');
    let password = $state('');
    let error = writable('');

    async function handleSubmit() {
        error.set('');
        try {
            await login(user, password);
            goto('/decks');
        } catch (e: any) {
            error.set(e.message);
        }
    }
</script>

<div class="flex flex-col gap-5 card bg-base-200 border-lg border-slate-100 shadow-xl p-10">
    <h1 class="text-2xl font-bold">Login</h1>
    <label for="user" class="input input-bordered flex items-center gap-2">
        <input type="text" id="username" bind:value={user} placeholder="User Name" class="grow border-none input"/>
    </label>
    <label for="password" class="input input-bordered flex items-center gap-2">
        <input type="password" id="password" bind:value={password} placeholder="Password" class="grow border-none input"/>
    </label>
    <button onclick={handleSubmit} class="btn bg-blue-700">Login</button>
    {#if $error}
    <div class="form-control">
        <p class="text-red-500">{$error}</p>
    </div>
    {/if}
    <a class="hover:underline hover:text-blue-700" href="/auth/register">Register</a>
</div>
