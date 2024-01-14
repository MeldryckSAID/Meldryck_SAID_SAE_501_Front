<template>
  <div class="background">
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
    <div class="test">
      <MyIcon stroke="primary" color="primary" name="trash" size="small" />
      <MyIcon stroke="primary" color="primary" name="more" size="small" />
      <MyIcon stroke="primary" color="primary" name="less" size="small" />
    </div>
    <div class="test">
      <MyIcon stroke="primary" color="primary" name="trash" size="regular" />
      <MyIcon stroke="primary" color="primary" name="more" size="regular" />
      <MyIcon stroke="primary" color="primary" name="less" size="regular" />
    </div>
    <div class="test">
      <MyIcon stroke="primary" color="primary" name="trash" size="big" />
      <MyIcon stroke="primary" color="primary" name="more" size="big" />
      <MyIcon stroke="primary" color="primary" name="less" size="big" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.background {
  background-color: black;
}
.test {
  display: flex;
  flex-direction: row;
  gap: 30px;
}
</style>

<script setup>
import { API } from "@/utils/axios";
import MyIcon from "~/components/icon/MyIcon.vue";

const apiDataboitier = ref([]);
const apiDatastones = ref([]);

const onboitier = async () => {
  console.log(API);
  const response = await API.get("/boitier");
  apiDataboitier.value = response.data;
};
const onstones = async () => {
  console.log(API);
  const response = await API.get("/stones");
  apiDatastones.value = response.data;
};

onMounted(async () => {
  await onstones();
  await onboitier();
});
</script>
