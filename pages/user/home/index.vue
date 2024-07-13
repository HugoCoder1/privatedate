<template>
    <div>
        <h1>Home Page</h1>
        <p class="font-semibold text-2xl underline leading-tight">Welcome {{ user?.displayName }}</p>
        <UButton type="button" @click="logout">
            <Icon class="w-4 h-4" name="lucide:log-out" />
            Logout
        </UButton>
        <Seo title="Home" />
    </div>
</template>

<script lang="ts" setup>
const user = useCurrentUser()
import { signOut } from 'firebase/auth'
const auth = useFirebaseAuth()

async function logout() {
    try {
        const res = await signOut(auth!)
        // if (!res) {
        //     throw error('Une erreur est survenue pendant la déconnexion')
        // }
        return await navigateTo('/login', { replace: true })
    } catch (error) {
        console.error(error)

    }
}
definePageMeta({
    middleware: 'auth',
    layout: 'dashboard'
})
</script>

