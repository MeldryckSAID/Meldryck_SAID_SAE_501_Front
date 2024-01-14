<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss" scoped></style>
<script setup>
const store = useGlobalStore()

onMounted(() => {
    // fonction pour vérifié si l'utilisateur était connecté à sa dernière visite
    const token = localStorage.getItem("token")
    store.setToken(JSON.parse(token))
})
</script>