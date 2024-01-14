<template>
  <div>
    <div v-if="userInfo">
      <h3>Informations de l'utilisateur</h3>
      <p>Nom : {{ userInfo.name }}</p>
      <p>Prénom : {{ userInfo.surname }}</p>
      <p>Email : {{ userInfo.mail }}</p>
      <p>ID : {{ userInfo.UserID }}</p>
    </div>
    <div v-else>
      <p>Utilisateur non connecté ou informations indisponibles</p>
    </div>

    <button v-if="isUserLoggedIn" @click="logout">Déconnexion</button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { API } from "@/utils/axios";
import { useGlobalStore } from "@/store/global.js";

const store = useGlobalStore();
const router = useRouter();
const userInfo = ref(null);

const isUserLoggedIn = computed(() => store.token !== null);

const fetchUserInfo = async () => {
  const userID = store.token;
  if (userID) {
    try {
      const response = await API.get(`/user/${userID}`);
      userInfo.value = response.data; // Ajustez selon le format de la réponse de votre API
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations de l'utilisateur :",
        error.message
      );
    }
  }
};

onMounted(fetchUserInfo);

const logout = () => {
  store.setToken(null);
  localStorage.removeItem("token");
  router.push("/connexion"); // Ou la route de votre choix
};
</script>

<style>
/* Votre style ici */
</style>
~/stores/global.js
