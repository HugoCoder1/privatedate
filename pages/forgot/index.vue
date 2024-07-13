<script setup lang="ts">
import { sendPasswordResetEmail } from 'firebase/auth'
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { Forgotschema } from '@/utils/schema'

type Schema = z.output<typeof Forgotschema>

const state = reactive({
  email: "",

})
const load = ref(false)
async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  const loading = useSonner.loading('Loading..', {
    description: 'Reset Password'
  })
  // const errormsg = useSonner.loading('Loading..', {
  //     description: 'Une erreur est survenue'
  // })
  load.value = true

  try {
    await sendPasswordResetEmail(auth!, state.email, {
      url: 'http://localhost:3000/login'
    })

    //show success
    useSonner.success('Please check your email', {
      id: loading,
      description: "Nous vous avez envoyer les instructions pour rénitialiser votre mot de passe"

    })



    // Redirect to HomePage
    return await navigateTo('/login', { replace: true })
  } catch (error: any) {

    useSonner.error(error.message, {
      id: "Une erreur est survenue",
    })


  } finally {
    load.value = false
  }



}

// definePageMeta({
//   layout: 'customlogin'
// })
//getauthinstance
const auth = useFirebaseAuth()
</script>

<template>
  <div class="flex flex-col items-center md:mt-[9rem] lg:mt-[6rem] mt-[7rem]">
    <fieldset :disabled="load">
      <UForm :schema="Forgotschema" :state="state" class="space-y-4" @submit="onSubmit">

        <h1 class="text-center text-3xl font-bold">Mot de passe oublié</h1>
        <p class="text-center">Entrer votre email </p>
        <!-- <UFormGroup label="Nom" name="name">
                    <UInput v-model="state.name" class="w-[450px]" />
                </UFormGroup> -->
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" class="w-[450px]" />
        </UFormGroup>



        <UButton type="submit" color="rose" class="w-[450px] text-center justify-center">
          <span>
            <!-- <Icon name="logos:push-icon" class="mr-2" /> -->
            Envoyer
          </span>
        </UButton>

      </UForm>
    </fieldset>
    <div class="space-y-4">
      <UDivider label="or" class="mt-2" />
      <div>
        <UButton type="button" :disabled="load" color="white" class="w-[450px] text-center">
          <NuxtLink to="/login" class="ml-40 flex items-center">
            Connecter-vous
          </NuxtLink>
        </UButton>


      </div>

    </div>





    <Seo title="Mot de passe oublié" />
  </div>
</template>

