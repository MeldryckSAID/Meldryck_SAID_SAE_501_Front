<template>
  <main class="main-login">
    <div>
      <myTitle el="h2" font="okine">Connexion</myTitle>
      <form class="container-form" @submit.prevent="connexion" method="post">
        <input
          class="container-form-input"
          type="text"
          name="name"
          id="pesudo"
          required
          placeholder="Pseudo"
          v-model="userCo.pseudo"
        />
        <input
          class="container-form-input"
          type="password"
          name="password"
          id="mdp"
          required
          placeholder="Mot de Passe"
          v-model="userCo.mdp"
        />

        <input class="container-form-btn" type="submit" value="Se connecter" />
      </form>
      <nuxt-link to="/login">
        <p class="txt">Vous n'avez pas de compte? Crée en un</p></nuxt-link
      >
    </div>
  </main>
</template>

<style lang="scss" scoped>
.main-login {
  background-color: black;
  color: aliceblue;
  text-align: center;
  width: 100vw;
  min-height: 100vh;
  display: grid;
  align-items: center;
}
.txt {
  text-align: center;
  color: white;
  padding: 2%;
}
.container-form {
  display: flex;
  gap: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  &-input {
    ::placeholder {
      color: white;
    }
    margin-bottom: 1rem;
    padding: 0.5rem;
    border: 1px solid white;
    background-color: black;
    border-radius: 0.25rem;
  }
  &-btn {
    position: relative;
    border: 2px solid black;
    border-radius: 50px;
    display: inline-grid;
    place-content: center;
    //   font-family: $arc;
    font-size: 15px;
    font-weight: 600;
    width: 178px;
    height: 52px;
    overflow: hidden;
    background: linear-gradient(to left, black 50%, white 50%);
    background-size: 200% 100%;
    background-position: 0% 0;
    transition: background-position 0.3s, color 0.3s;
    color: black;
    text-decoration: none;
    &:hover {
      background-position: 100% 0;
      color: white;
      box-shadow: inset 0 0 0 2px white, 0 0 0;
    }
  }
}
</style>

<script setup>
import { client } from "@/utils/axios";
import { useGlobalStore } from "@/stores/global";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useGlobalStore();
const userCo = ref({});
const message = ref("");

const connexion = async () => {
  try {
    const response = await client.post(`/login`, userCo.value);
    const { token } = response.data; // Récupérer le token depuis la réponse client
    store.setToken(token); // Enregistrer le token dans le store Pinia
    message.value = "Vous êtes bien connecté";
    router.push("/profile");
  } catch (error) {
    message.value = "Erreur lors de la connexion";
  }
};
</script>
