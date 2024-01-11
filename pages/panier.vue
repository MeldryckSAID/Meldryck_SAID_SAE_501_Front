<script setup>
import { API } from "@/utils/axios";

const apiDataCart = ref([]);

onMounted(async () => {
  await onCart();
});

const onCart = async () => {
  console.log("test2");
  const response = await API.get("/cart");
  apiDataCart.value = response.data;
};
</script>
<template>
  <div>
    <h1>Cart</h1>
  </div>
  <ul>
    <li>nsm</li>
    <li v-for="item in apiDataCart">{{ item }}</li>
    <li v-for="item in apiDataCart">{{ item.name }}</li>
    <li v-for="item in apiDataCart">{{ item.Password }}</li>
    <li v-for="item in apiDataCart">{{ item.surname }}</li>
    <li v-for="item in apiDataCart">{{ item.mail }}</li>
  </ul>
</template>

<style lang="scss"></style>
