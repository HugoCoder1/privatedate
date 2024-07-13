<template>
    <Seo title="Profile" />
    <div>
        <h1>ProfilePage</h1>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    middleware: 'auth'
})
</script>

