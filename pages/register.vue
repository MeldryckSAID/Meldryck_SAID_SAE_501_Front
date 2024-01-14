<template>
  <main class="main-register">
    <div>
      <h2>Inscription</h2>
      <form class="container-form">
        <input
          class="container-form-input"
          v-model="name"
          type="text"
          placeholder="Nom"
        />
        <input
          class="container-form-input"
          v-model="password"
          type="password"
          placeholder="Mot de passe"
        />
        <button class="container-form-btn" @click="register">
          Créer un compte
        </button>
      </form>
    </div>
  </main>
</template>
<style lang="scss" scoped>
.main-register {
  background-color: black;
  color: aliceblue;
  text-align: center;
  width: 100vw;
  min-height: 100vh;
  display: grid;
  align-items: center;
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
import { ref } from "vue";
import { registerUser } from "~/utils/axios";

const name = ref("");
const password = ref("");
const message = ref("");
const register = async () => {
  try {
    const user = await registerUser(name.value, password.value);
    console.log("Compte utilisateur créé avec succès:", user);
    message.value = "votre compte a été créer avec succès";
  } catch (error) {
    console.error("Erreur lors de l’inscription:", error);
  }
};
</script>
