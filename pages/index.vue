<template>
  <div>
    <h1>Hello helloooooo</h1>
    <montre />
    <!-- <h1 v-for="item in apiData">{{ item }}</h1> -->
    {{ apiData }}
    {{ apiData.NomBoitier }}
    {{ apiData.NomPierre }}
    <h1 v-for="item in apiData">{{ item.NomBoitier }}</h1>
    <h1 v-for="item in apiData">{{ item.NomPierre }}</h1>
  </div>
</template>

<style lang="scss" scoped></style>

<script setup>
import { API } from "@/utils/axios";

const apiData = ref([]);

const onboitier = async () => {
  console.log("test2");
  const response = await API.get("/boitier");
  apiData.value = response.data;
};
const onstones = async () => {
  console.log("test");
  const response = await API.get("/stones");
  apiData.value = response.data;
};

onMounted(async () => {
  await onstones();
  await onboitier();
});
</script>
