<script setup>
import { API } from "@/utils/axios";

import { useGlobalStore } from "../store/global.js";
const store = useGlobalStore();

const router = useRouter();
const userNew = ref({});
const userCo = ref({});
const message = ref("");
const userInfo = ref(null);

// enregistrement de la montre modifiée dans la base de données
const inscription = async () => {
  try {
    await API.post(`/inscription`, userNew.value);
    message.value = "Vous êtes bien inscrit";
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error.message);
    message.value = "Erreur lors de l'inscription";
  }
};

// enregistrement de la montre modifiée dans la base de données
// const connexion = async () => {
//   try {
//     const response = await API.post(`/login`, userCo.value);
//     const { token } = response.data; // Récupérer le token depuis la réponse API
//     store.setToken(token); // Enregistrer le token dans le store Pinia
//     message.value = "Vous êtes bien connecté";
//     router.push("/user");
//   } catch (error) {
//     console.error("Erreur lors de la connexion :", error.message);
//     message.value = "Erreur lors de la connexion";
//   }
// };

// const fetchUserInfo = async () => {
//   try {
//     const token = store.token; // Récupérer le token du store
//     if (token) {
//       const response = await API.get(`/user/${token}`);
//       userInfo.value = response.data[0]; // Supposons que l'API renvoie un tableau
//     }
//   } catch (error) {
//     console.error("Erreur lors de la récupération des informations de l'utilisateur :", error.message);
//   }
// };

const connexion = async () => {
  try {
    const response = await API.post(`/login`, userCo.value);
    const { token } = response.data; // Récupérer le token depuis la réponse API
    store.setToken(token); // Enregistrer le token dans le store Pinia
    message.value = "Vous êtes bien connecté";
    // Récupérer les informations de l'utilisateur
    await fetchUserInfo(token);
    //router.push("/user");
  } catch (error) {
    console.error("Erreur lors de la connexion :", error.message);
    message.value = "Erreur lors de la connexion";
  }
};

const fetchUserInfo = async (userID) => {
  try {
    const response = await API.get(`/user/${userID}`);
    userInfo.value = response.data[0]; // Supposons que l'API renvoie un tableau
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations de l'utilisateur :",
      error.message
    );
  }
};

onMounted(() => {
  const token = store.token;
  if (token) {
    fetchUserInfo(token);
  }
});

const isUserLoggedIn = computed(() => store.token !== null);

const logout = async () => {
  try {
    // Envoyer une requête POST à la route /logout de l'API
    await API.post("/logout");
    // Nettoyer l'état de connexion côté client
    store.setToken(null);
    localStorage.removeItem("token");
    router.push("/connexion");
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error.message);
  }
};
</script>
<template>
  <div class="background">
    <div class="container">
      <div class="container-form">
        <h2>Inscription</h2>

        <form
          class="form-inscription"
          @submit.prevent="inscription"
          method="post"
        >
          <input
            class="form-inscription-input"
            type="text"
            name="name"
            id="name"
            required
            placeholder="name"
            v-model="userNew.name"
          />
          <input
            class="form-inscription-input"
            type="text"
            name="surname"
            id="surname"
            required
            placeholder="surname"
            v-model="userNew.surname"
          />
          <input
            class="form-inscription-input"
            type="text"
            name="mail"
            id="mail"
            required
            placeholder="mail"
            v-model="userNew.mail"
          />
          <input
            class="form-inscription-input"
            type="password"
            name="Password"
            id="Password"
            required
            placeholder="Mot de Passe"
            v-model="userNew.Password"
          />

          <input
            class="form-inscription-btn"
            type="submit"
            value="Je m'inscris"
          />
        </form>
      </div>

      <div class="line"></div>
      <div class="container-form">
        <h2>Connexion</h2>

        <form class="form-co" @submit.prevent="connexion" method="post">
          <input
            class="form-co-input"
            type="text"
            name="mail"
            id="mail"
            required
            placeholder="mail"
            v-model="userCo.mail"
          />
          <input
            class="form-co-input"
            type="password"
            name="Password"
            id="Password"
            required
            placeholder="Mot de Passe"
            v-model="userCo.Password"
          />

          <input class="form-co-btn" type="submit" value="Je me connecte" />
        </form>
      </div>
    </div>

    <div v-if="userInfo">
      <h3>Informations de l'utilisateur</h3>
      <p>Nom : {{ userInfo.name }}</p>
      <p>Prénom : {{ userInfo.surname }}</p>
      <p>Email : {{ userInfo.mail }}</p>
    </div>
    <div v-else>
      <p>Utilisateur non connecté ou informations indisponibles</p>
    </div>

    <div v-if="isUserLoggedIn">
      <button @click="logout">Déconnexion</button>
    </div>

    <p>{{ message }}</p>
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
.container {
  display: flex;
  justify-content: space-around;
  &-form {
    width: fit-content;
    padding-left: 5%;
    padding-right: 5%;

    border-radius: 5%;
    color: black;
    text-align: center;
    flex-direction: column;
    background-color: white;
    justify-content: center;
    align-items: center;
  }
  .line {
    width: 4px;
    height: 356px;
    background-color: white;
  }
}

.form-co,
.form-inscription {
  display: flex;
  flex-direction: column;

  gap: 16px;
  &-input {
    width: fit-content;
    padding: 5px;
    border: 2px solid black;
    border-radius: 5%;
    background-color: black;
    color: white;
  }
  &-btn {
    background-color: black;
    color: white;
    padding: 5%;
  }
}
</style>
../stores/global.js
