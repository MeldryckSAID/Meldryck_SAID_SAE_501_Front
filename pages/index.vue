<template>
  <div class="background">
    <!-- <div>
      <h1>Hello helloooooo</h1>

      <main class="layout__page"></main>

      <ul>
        <li v-for="item in apiDataboitier">{{ item.NomBoitier }}</li>
      </ul>
      <ul>
        <li v-for="item in apiDatastones">{{ item.NomPierre }}</li>
      </ul>
    </div> -->
    <div class="container-home">
      <BtnMybtn to="/connexion"  >Inscription</BtnMybtn>
      <BtnMybtn to="/connexion" variant="reverse" >Connexion</BtnMybtn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.background {
  background-color: black;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-content: center;
}
.container-home {
  gap: 30px;
  display: flex;
  justify-content: center;
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
