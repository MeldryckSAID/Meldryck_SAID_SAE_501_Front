<template>
  <div>
    <h1>Hello helloooooo</h1>

    <main class="layout__page"></main>

    <ul>
      <li v-for="item in apiDataboitier">{{ item.NomBoitier }}</li>
    </ul>
    <ul>
      <li v-for="item in apiDatastones">{{ item.NomPierre }}</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>

<script setup>
import { API } from "@/utils/axios";

const apiDataboitier = ref([]);
const apiDatastones = ref([]);

const onboitier = async () => {
  console.log("test2");
  const response = await API.get("/boitier");
  apiDataboitier.value = response.data;
};
const onstones = async () => {
  console.log("test");
  const response = await API.get("/stones");
  apiDatastones.value = response.data;
};

onMounted(async () => {
  await onstones();
  await onboitier();
});
</script>
