<script setup>
import { API } from "@/utils/axios";

import { useGlobalStore } from '../store/global.js'
const store = useGlobalStore()

const router = useRouter()
const userNew = ref({})
const userCo = ref({})
const message = ref("")

// enregistrement de la montre modifiée dans la base de données
const inscription = async () => {
    try {
        await API.post(`/inscription`, userNew.value);
        message.value = "Vous êtes bien inscrit"
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error.message)
        message.value = "Erreur lors de l'inscription"
    }
}

// enregistrement de la montre modifiée dans la base de données
const connexion = async () => {
    try {
        const response = await API.post(`/login`, userCo.value)
        const { token } = response.data // Récupérer le token depuis la réponse API
        store.setToken(token) // Enregistrer le token dans le store Pinia
        message.value = "Vous êtes bien connecté"
        router.push('/user')
    } catch (error) {
        console.error("Erreur lors de la connexion :", error.message)
        message.value = "Erreur lors de la connexion"
    }
}

</script>
<template>
  <div>
    <h1>connexion</h1>
  </div>
    <div>
            <h2>Inscription</h2>

            <form @submit.prevent="inscription" method="post">
                <input type="text" name="name" id="name" required placeholder="name" v-model="userNew.name">
                <input type="text" name="surname" id="surname" required placeholder="surname" v-model="userNew.surname">
                <input type="text" name="mail" id="mail" required placeholder="mail" v-model="userNew.mail">
                <input type="password" name="Password" id="Password" required placeholder="Mot de Passe" v-model="userNew.Password">

                <input type="submit" value="Je m'inscris">
            </form>

            {{ userNew }}
        </div>

        <div>
            <h2>Connexion</h2>

            <form @submit.prevent="connexion" method="post">
                <input type="text" name="mail" id="mail" required placeholder="mail" v-model="userCo.mail">
                <input type="password" name="Password" id="Password" required placeholder="Mot de Passe" v-model="userCo.Password">

                <input type="submit" value="Je me connect">
            </form>

            {{ userCo }}
        </div>

        <p>{{ message }}</p>

</template>

<style lang="scss"></style>
