<script setup lang="ts">
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { Registerschema } from '@/utils/schema'
const googleAuthProvider = new GoogleAuthProvider()

type Schema = z.output<typeof Registerschema>

const state = reactive({
    name: "",
    email: "",
    password: ""

})
const load = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
    // Do something with data
    const loading = useSonner.loading('Loading..', {
        description: 'Compte est crée'
    })
    // const errormsg = useSonner.loading('Loading..', {
    //     description: 'Une erreur est survenue'
    // })
    load.value = true

    try {
        const { user } = await createUserWithEmailAndPassword(auth!, state.email, state.password)
        await updateProfile(user, { displayName: state.name })

        //show success
        useSonner.success('Félicitation votre compte est crée', {
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
async function GoogleSignIn(event: any) {
    // Do something with data
    const loading = useSonner.loading('Loading..', {
        description: 'Compte est crée'
    })
    // const errormsg = useSonner.loading('Loading..', {
    //     description: 'Une erreur est survenue'
    // })
    load.value = true
    try {
        await signInWithPopup(auth!, googleAuthProvider)

        useSonner.success('Félicitation votre compte est crée', {
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
    layout: 'custom',
    middleware:"logged"
})
//getauthinstance
const auth = useFirebaseAuth()
</script>

<template>
    <div class="flex flex-col items-center md:mt-[9rem] lg:mt-[6rem] mt-[7rem]">
        <fieldset :disabled="load">
            <UForm :schema="Registerschema" :state="state" class="space-y-4" @submit="onSubmit">
                <h1 class="text-center text-3xl font-bold">Inscription</h1>
                <p class="text-center">Entrer vos informations pour vous inscrire</p>
                <UFormGroup label="Nom" name="name">
                    <UInput v-model="state.name" class="w-[450px]" />
                </UFormGroup>
                <UFormGroup label="Email" name="email">
                    <UInput v-model="state.email" class="w-[450px]" />
                </UFormGroup>

                <UFormGroup label="Password" name="password">
                    <UInput v-model.trim="state.password" type="password" class="w-[450px]" />
                </UFormGroup>
                <!-- <div class="flex justify-between">

                <NuxtLink to="/forgot">Vous avez un compte?</NuxtLink>


            </div> -->
                <UButton type="submit" color="rose" class="w-[450px] text-center">
                    <span class="ml-[11rem]">Inscription</span>
                </UButton>

            </UForm>
        </fieldset>
        <div class="space-y-4">
            <UDivider label="or" class="mt-2" />
            <div>
                <UButton type="button" @click="GoogleSignIn" :disabled="load" color="white" class="w-[450px] text-center">
                    <span class="ml-40 flex items-center">
                        <Icon name="logos:google-icon" class="mr-2" /> Inscription via Google
                    </span>
                </UButton>


            </div>
            <div class="flex justify-between">
                <NuxtLink to="/login" class="text-start">
                    Vous avez un compte?<span class="ml-1 text-rose-500">Login</span>
                </NuxtLink>
                <!-- <NuxtLink to="/forgot" class="text-start">
                    <span> Mot de passe oublié<span class="ml-1 text-rose-500">Login</span></span>
                </NuxtLink> -->
            </div>
        </div>





        <Seo title="Register" />
    </div>
</template>

