<script setup>
import { API } from "@/utils/axios";

const apiDatauser = ref([]);

onMounted(async () => {
  await onuser();
});

const onuser = async () => {
  console.log("test2");
  const response = await API.get("/user");
  apiDatauser.value = response.data;
};
</script>
<template>
  <div>
    <h1>user</h1>
  </div>
  <ul>
    <li v-for="item in apiDatauser">{{ item }}</li>
    <li v-for="item in apiDatauser">{{ item.name }}</li>
    <li v-for="item in apiDatauser">{{ item.Password }}</li>
    <li v-for="item in apiDatauser">{{ item.surname }}</li>
    <li v-for="item in apiDatauser">{{ item.mail }}</li>
  </ul>
</template>

<style lang="scss"></style>
