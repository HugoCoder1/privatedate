<script setup lang="ts">
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { Loginschema } from '@/utils/schema'
const googleAuthProvider = new GoogleAuthProvider()

type Schema = z.output<typeof Loginschema>

const state = reactive({
    name: "",
    email: "",
    password: ""

})
const load = ref(false)
const errorMessage = ref('')
async function onSubmit(event: FormSubmitEvent<Schema>) {
    // Do something with data
    const loading = useSonner.loading('Loading..', {
        description: 'Connexion'
    })
    // const errormsg = useSonner.loading('Loading..', {
    //     description: 'Une erreur est survenue'
    // })
    load.value = true

    try {
        const { user } = await signInWithEmailAndPassword(auth!, state.email, state.password)
        if (user?.email !== state.email) {

            errorMessage.value = "Email ou Mot de passe Incorrect"
            useSonner.error('Erreur', {
                id: errorMessage.value
            })
            return;
        }

        //show success
        useSonner.success('Nous vous souhaiter bon retour cher utilisateur', {
            id: loading
        })



        // Redirect to HomePage
        return await navigateTo('/user/home', { replace: true })
    } catch (error: any) {

        useSonner.error(error.message, {
            id: "Une erreur est survenue"
        })


    } finally {
        load.value = false
    }



}
async function GoogleSignIn(event: any) {
    // Do something with data
    const loading = useSonner.loading('Loading..', {
        description: 'Connexion'
    })
    // const errormsg = useSonner.loading('Loading..', {
    //     description: 'Une erreur est survenue'
    // })
    load.value = true
    try {
        await signInWithPopup(auth!, googleAuthProvider)

        useSonner.success('Nous vous souhaiter bon retour cher utilisateur', {
            id: loading
        })

        // Redirect to HomePage
        return await navigateTo('/user/home', { replace: true })
    } catch (error: any) {
        useSonner.error(error.message, {
            id: loading
        })

    } finally {
        load.value = false
    }

}
definePageMeta({
    layout: 'customlogin',
    middleware: 'logged'
})
//getauthinstance

const auth = useFirebaseAuth()
</script>

<template>
    <div class="flex flex-col items-center md:mt-[9rem] lg:mt-[6rem] mt-[7rem]">
        <fieldset :disabled="load">
            <UForm :schema="Loginschema" :state="state" class="space-y-4" @submit="onSubmit">

                <h1 class="text-center text-3xl font-bold">Connexion</h1>
                <p class="text-center">Entrer vos informations pour vous connectez</p>
                <!-- <UFormGroup label="Nom" name="name">
                    <UInput v-model="state.name" class="w-[450px]" />
                </UFormGroup> -->
                <UFormGroup label="Email" name="email">
                    <UInput v-model="state.email" class="w-[450px]" />
                </UFormGroup>

                <UFormGroup label="Password" name="password">
                    <UInput v-model.trim="state.password" type="password" class="w-[450px]" />
                </UFormGroup>
                <div class="flex justify-start hover:underline">

                    <NuxtLink to="/forgot">Mot de passe oublié?</NuxtLink>


                </div>
                <UButton type="submit" color="rose" class="w-[450px] text-center justify-center">
                    <span>Login</span>
                </UButton>

            </UForm>
        </fieldset>
        <div class="space-y-4">
            <UDivider label="or" class="mt-2" />
            <div>
                <UButton type="button" @click="GoogleSignIn" :disabled="load" color="white" class="w-[450px] text-center">
                    <span class="ml-40 flex items-center">
                        <Icon name="logos:google-icon" class="mr-2" /> Connexion via Google
                    </span>
                </UButton>


            </div>
            <div class="flex justify-between">
                <NuxtLink to="/register" class="text-start">
                    Vous n'avez un compte?<span class="ml-1 text-rose-500">Inscrivez-vous</span>
                </NuxtLink>
                <!-- <NuxtLink to="/forgot" class="text-start">
                    <span> Mot de passe oublié<span class="ml-1 text-rose-500">Login</span></span>
                </NuxtLink> -->
            </div>
        </div>





        <Seo title="Login" />
    </div>
</template>

