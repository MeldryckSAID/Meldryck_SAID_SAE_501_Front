<template>
  <main class="main-id">
    <myTitle el="h2" font="okine">Modification de la Montre</myTitle>

    <div class="container-montre">
      <table class="container-montre-infos">
        <tr class="container-montre-info">
          <th>Nom</th>
          <td>{{ montrePreview.nom }}</td>
        </tr>
        <tr class="container-montre-info">
          <td>Bracelet Texture</td>
          <td>{{ montrePreview.bracelet_texture }}</td>
          <td>{{ montrePreview.bracelet_texture_prix }} €</td>
        </tr>
        <tr class="container-montre-info">
          <td>Boitier Texture</td>
          <td>{{ montrePreview.boitier_texture }}</td>
          <td>{{ montrePreview.boitier_texture_prix }} €</td>
        </tr>
        <tr class="container-montre-info">
          <td>Boitier Forme</td>
          <td>{{ montrePreview.boitier_forme }}</td>
          <td>{{ montrePreview.boitier_forme_prix }} €</td>
        </tr>
        <tr class="container-montre-info">
          <td>Pierre</td>
          <td>{{ montrePreview.pierre_nom }}</td>
          <td>{{ montrePreview.pierre_prix }} €</td>
        </tr>
        <tr class="container-montre-info">
          <td>Prix total</td>
          <td colspan="2">{{ montrePreview.prix_montre }} €</td>
        </tr>

        <p class="container-montre-info">
          {{ message }}
        </p>
      </table>
      <div class="container-montre-info-btn" v-if="store.token">
        <myButton v-if="!isMontreInPanier && store.token" @click="ajouterPanier"
          >Ajouter au Panier</myButton
        >
        <myButton
          v-if="isMontreInPanier && store.token"
          @click="supprimerPanier"
          >Supprimer du Panier</myButton
        >
      </div>
    </div>

    <form
      v-if="store.token && memeUser"
      @submit.prevent="modifierMontre"
      class="contaier-form-modif"
    >
      <div class="contaier-form-modif-nom">
        <label for="nom">Nom de la Montre: </label>
        <input
          class="contaier-form-modif-nom-input"
          type="text"
          name="nom"
          id="nom"
          v-model="montrePreview.nom"
        />
      </div>
      <div class="contaier-form-modif-selection">
        <div class="contaier-form-modif-selection-input">
          <label for="boitier_texture">Texture du Boitier</label>
          <select
            class="contaier-form-modif-selection-input-select"
            name="boitier_texture"
            id="boitier_texture"
            v-model="montrePreview.boitier_texture"
          >
            <option
              v-for="b in boitier_texture"
              :key="b.boitierTextureID"
              :value="b.nom"
              @click="updatePrice"
            >
              {{ b.nom }}
            </option>
          </select>
        </div>

        <div class="contaier-form-modif-selection-input">
          <label for="boitier_forme">Forme du Boitier</label>
          <select
            class="contaier-form-modif-selection-input-select"
            name="boitier_forme"
            id="boitier_forme"
            v-model="montrePreview.boitier_forme"
          >
            <option
              v-for="b in boitier_forme"
              :key="b.boitierFormeID"
              :value="b.nom"
              @click="updatePrice"
            >
              {{ b.nom }}
            </option>
          </select>
        </div>

        <div class="contaier-form-modif-selection-input">
          <label for="bracelet_texture">Texture du Bracelet</label>
          <select
            class="contaier-form-modif-selection-input-select"
            name="bracelet_texture"
            id="bracelet_texture"
            v-model="montrePreview.bracelet_texture"
          >
            <option
              v-for="b in bracelet_texture"
              :key="b.braceletTextureID"
              :value="b.nom"
              @click="updatePrice"
            >
              {{ b.nom }}
            </option>
          </select>
        </div>

        <div class="contaier-form-modif-selection-input">
          <label for="pierre">Pierre Préciseuse</label>
          <select
            class="contaier-form-modif-selection-input-select"
            name="pierre"
            id="pierre"
            v-model="montrePreview.pierre"
          >
            <option
              v-for="p in pierre"
              :key="p.pierreID"
              :value="p.nom"
              @click="updatePrice"
            >
              {{ p.nom }}
            </option>
          </select>
        </div>

        <div class="contaier-form-modif-selection-input">
          <label for="main_color">Couleur</label>
          <input
            type="color"
            name="main_color"
            id="main_color"
            v-model="montrePreview.main_color"
          />
        </div>
      </div>
      <div class="contaier-form-modif-boutons">
        <input
          v-if="memeUser"
          class="contaier-form-modif-boutons-btn"
          type="submit"
          value="Enregistrer les Modifications"
        />
        <myButton
          v-if="store.token"
          class="contaier-form-modif-boutons-btn"
          color="black"
          @click="supp = true"
          >Supprimer</myButton
        >
      </div>
    </form>

    <div v-if="!store.token" class="fiche_montre__login">
      <p>
        Pour modifier cette montre où l'ajouter à votre panier, veuillez vous
        connecter ou vous inscrire.
      </p>
      <myButton class="fiche_montre__bouton" lien="/login">Login</myButton>
    </div>

    <div v-if="supp" class="fiche_montre__popup-supp">
      <p>
        Vous êtes sur de vouloir supprimer cette montre ? Cette action est
        irréversible.
      </p>
      <p>
        Cette montre disparaitra de votre panier et de ceux des autres
        utilisateurs.
      </p>

      <myButton @click="supp = false">Non, je la laisse</myButton>
      <myButton color="black" @click="supprimerMontre"
        >Oui, je veux la supprimer</myButton
      >
    </div>
  </main>
</template>

<style lang="scss" scoped>
.main-id {
  background-color: black;
  color: aliceblue;
  text-align: center;
  width: 100vw;
  min-height: 100vh;
  display: grid;
  align-items: center;
}
.contaier-form-modif {
  display: flex;
  flex-direction: column;
  justify-content: center;
  &-nom {
    &-input {
      margin-bottom: 1rem;
      padding: 0.5rem;
      border: 1px solid white;
      background-color: black;
      border-radius: 0.65rem;
      color: white;
    }
  }
  &-selection {
    display: flex;
    gap: 30px;
    justify-content: space-around;
    &-input {
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: fit-content;
      gap: 20px;
      &-select {
        margin-bottom: 1rem;
        padding: 0.5rem;
        border: 1px solid white;
        background-color: black;
        border-radius: 0.65rem;
        color: white;
      }
    }
  }
  &-boutons {
    display: flex;
    justify-content: space-around;
    &-btn {
      position: relative;
      border: 2px solid white;
      border-radius: 50px;
      display: inline-grid;
      place-content: center;
      //font-family: $arc;
      font-size: 12px;
      font-weight: 600;
      width: 178px;
      height: 52px;
      overflow: hidden;
      background: linear-gradient(to left, white 50%, black 50%);
      background-size: 200% 100%;
      background-position: 0% 0;
      transition: background-position 0.3s, color 0.3s;
      color: white;
      text-decoration: none;
      &:hover {
        background-position: 100% 0;
        color: black;
        box-shadow: inset 0 0 0 2px black, 0 0 0;
      }
    }
  }
}
.container-montre {
  .container-montre-infos {
    width: 100%;
    border-collapse: collapse;

    th {
      text-align: left;
    }

    .container-montre-info {
      &-btn {
        padding: 10px;
      }
      td {
        padding: 8px;
        border: 1px solid white;

        &-valeur {
        }
      }
      .end {
        text-align: end;
      }
    }

    .container-montre-info-message {
      td {
        color: red;
      }
    }
  }
}
</style>

<script setup>
import { client } from "@/utils/axios.js";

const store = useGlobalStore();

const route = useRoute();
const router = useRouter();
const montre = ref([]);
const montrePreview = ref({});

const boitier_texture = ref([]);
const boitier_forme = ref([]);
const bracelet_texture = ref([]);
const pierre = ref([]);

const users = ref([]);
const user = ref([]);
const actuelUser = ref([]);
const memeUser = ref(false);

const message = ref("");
const supp = ref(false);

// récupérations des tables pour afficher la montre et tous les paramètres
const getMontre = async () => {
  const response = await client.get(`/montre/${route.params.id}`);
  montre.value = response.data[0];
  montrePreview.value = response.data[0];
};

const getBoitier_Texture = async () => {
  const response = await client.get(`/boitier_texture`);
  boitier_texture.value = response.data;
};

const getBoitier_Forme = async () => {
  const response = await client.get(`/boitier_forme`);
  boitier_forme.value = response.data;
};

const getBracelet_Texture = async () => {
  const response = await client.get(`/bracelet_texture`);
  bracelet_texture.value = response.data;
};

const getPierre = async () => {
  const response = await client.get(`/pierres`);
  pierre.value = response.data;
};

const getUser = async () => {
  const response = await client.get(`/user`);
  users.value = response.data;
  user.value = users.value.find((u) => u.pseudo === montre.value.createur);
  actuelUser.value = users.value.find((u) => u.userID === store.token);
  console.log("token", store.token, "user", user.value.userID);
  memeUser.value = store.token == user.value.userID ? true : false;
};

// modification des prix en fonction des noms de chaque élément
const updatePrice = async () => {
  const BoitierTextureSelect = boitier_texture.value.find(
    (bot) => bot.nom === montre.value.boitier_texture
  );
  const BoitierFormeSelect = boitier_forme.value.find(
    (bot) => bot.nom === montre.value.boitier_forme
  );
  const BraceletTextureSelect = bracelet_texture.value.find(
    (brt) => brt.nom === montre.value.bracelet_texture
  );
  const PierreSelect = pierre.value.find(
    (p) => p.couleur === montre.value.pierre_couleur
  );

  montre.value.boitier_texture_prix = BoitierTextureSelect.prix;
  montre.value.boitier_forme_prix = BoitierFormeSelect.prix;
  montre.value.bracelet_texture_prix = BraceletTextureSelect.prix;
  montre.value.pierre_prix = PierreSelect.prix;

  montre.value.prix_montre =
    BoitierTextureSelect.prix +
    BoitierFormeSelect.prix +
    BraceletTextureSelect.prix +
    PierreSelect.prix;
};

// enregistrement de la montre modifiée dans la base de données
const modifierMontre = async () => {
  console.log("Données envoyées pour ajouter une montre:", montre.value);
  try {
    if (memeUser.value) {
      await client.put(`/montre/${route.params.id}/modif`, montrePreview.value);
      message.value = "Montre modifiée avec succès.";
    } else {
      montre.value.createur = actuelUser.value.pseudo;
      const response = await client.post(`/montre/add`, montre.value);

      if (response.data.message != "Cette montre existe déjà pour cet user") {
        message.value = "Montre créée avec succès.";
        router.push(`/montre/${response.data.id_montre}`);
      } else {
        message.value = "Vous avez déjà copié cette montre !";
      }
    }
  } catch (error) {
    console.error(
      "Erreur lors de la modification de la montre :",
      error.message
    );
    message.value = "Erreur lors de la modification de la montre.";
  }
};

// suppression de la montre dans la base de données
const supprimerMontre = async () => {
  try {
    await client.delete(`/montre/${route.params.id}/supp/${store.token}`);
    message.value = "Montre supprimée avec succès.";
    router.push("/montre");
  } catch (error) {
    console.error(
      "Erreur lors de la suppression de la montre :",
      error.message
    );
    message.value = "Erreur lors de la suppression de la montre.";
  }
};

const panier = ref([]);
const newPanier = ref({});

// récupérations du panier
const getPanier = async () => {
  const response = await client.get(`/user/${store.token}/panier`);
  panier.value = response.data;
};

// fonction qui vérifie si la montre est dans le panier
const isMontreInPanier = computed(() => {
  if (montre.value && panier.value) {
    const montresInPanier = panier.value.map((item) => item.montreID);
    return montresInPanier.includes(montre.value.montreID);
  }
  return false;
});

// enregistrement de la montre dans le panier
const ajouterPanier = async () => {
  newPanier.value.id_montre = montre.value.montreID;
  newPanier.value.id_user = store.token;
  console.log("Ajout au panier", newPanier.value);
  try {
    await client.post(`/user/panier/add`, newPanier.value);
    message.value = "Montre mis dans le panier avec succès.";
    // rappelle de la fonction pour mettre à jour le bouton
    getPanier();
  } catch (error) {
    console.error("Erreur lors de la mise dans le panier :", error.message);
    message.value = "Erreur lors de la mise dans le panier.";
  }
};

// retire la montre du panier
const supprimerPanier = async () => {
  newPanier.value.id_montre = montre.value.montreID;
  newPanier.value.id_user = store.token;

  try {
    await client.delete(
      `/user/panier/supp/${newPanier.value.id_user}/${newPanier.value.id_montre}`
    );
    message.value = "Montre retiré du panier avec succès.";
    // rappelle de la fonction pour mettre à jour le bouton
    getPanier();
  } catch (error) {
    console.error("Erreur lors de la supprimession du panier :", error.message);
    message.value = "Erreur lors de la supprimession du panier.";
  }
};

onMounted(async () => {
  await getMontre();
  await getBoitier_Texture();
  await getBoitier_Forme();
  await getBracelet_Texture();
  await getPierre();
  await getUser();
  await getPanier();
});
</script>
