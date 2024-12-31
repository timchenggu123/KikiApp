<script lang="ts">
    import { login, register } from '$lib/api/auth';
    import { goto } from '$app/navigation';
    import { writable } from 'svelte/store';

    let user = $state('');
    let password = $state('');
    let error = writable('');
    let confirmPwrd = $state('');
    
    async function handleSubmit() {
        error.set('');
        try {
            if (password !== confirmPwrd) {
                throw new Error('Passwords do not match');
            }
            await register(user, password);
            goto('/auth/login');
        } catch (e: any) {
            error.set(e.message);
        }
    }
</script>

<div class="flex flex-col gap-5 card bg-base-200 border-lg border-slate-100 shadow-xl p-10">
    <h1 class="text-2xl font-bold">Register</h1>
    <p class="text-lg">User Name</p>
    <label for="user" class="input input-bordered flex items-center gap-2">
        <input type="text" id="username" bind:value={user} placeholder="User Name" class="grow border-none input"/>
    </label>
    <p class="text-lg">Password</p>
    <label for="password" class="input input-bordered flex items-center gap-2">
        <input type="password" id="password" bind:value={password} placeholder="Password" class="grow border-none input"/>
    </label>
    <label class="input input-bordered flex items-center gap-2">
        <input type="password" id="password" bind:value={confirmPwrd} placeholder="Confirm Password" class="grow border-none input"/>
    </label>
    <button onclick={handleSubmit} class="btn bg-blue-700">Register</button>
    {#if $error}
    <div class="form-control">
        <p class="text-red-500">{$error}</p>
    </div>
    {/if}
    <a class="hover:underline hover:text-blue-700" href="/auth/login">Login</a>
</div>