<template>
    <Head>
        <Title>{{ title }}</Title>
    </Head>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    }
})

</script>

