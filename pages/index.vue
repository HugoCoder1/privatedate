<template>
    <Seo title="Site de rencontre pour adulte" />
    <div class="max-w-5xl mx-auto p-4 min-h-screen">
        <div class="flex justify-between items-center border-b py-2">
            <p class="text-2xl text-rose-500">PrivateDate</p>

            <div class="flex justify-between items-center space-x-4">
                <NuxtLink to="#">Accueil</NuxtLink>
                <NuxtLink to="#">Guides</NuxtLink>
                <NuxtLink to="#">Contact</NuxtLink>
                <div class="space-x-4">
                    <!-- button Link -->
                    <UButton to="/login" color="blue">Login</UButton>
                    <RegisterButton title="Register" color="rose" />
                </div>
            </div>

        </div>
        <div class="p-8">
            <div class="flex justify-between">
                <div class="space-y-4">
                    <h1 class="text-4xl md:text-3xl leading-tight ">Plateforme de <span
                            class="text-rose-500">rencontre</span>
                        anonyme n°1
                        sur le marché
                    </h1>
                    <p className="text-2xl">Trouver votre date partout tout en étant sécurisé</p>
                    <div>
                        <UButton to="/register" label="Rejoindre la plateforme" color="rose">
                            <template #trailing>
                                <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
                            </template>
                        </UButton>
                    </div>
                </div>
                <div>
                    <img src="~/assets/img/istockphoto-1877940175-1024x1024.jpg" alt="Image chat"
                        class="w-[500px] h-[200px]">
                </div>
            </div>
            <div>
                <img src="~/assets/img/istockphoto-1877940175-1024x1024.jpg" alt="Image chat">
            </div>
        </div>
    </div>
</template>



