<template>
  <div class="main-crea">

    <myTitle el="h2" font="okine">Création de votre Montre</myTitle>

    <div class="canvas">
      <treescene v-bind="montre" />
    </div>

    <h2>Fonctionnement API</h2>

    <!-- <div class="container-crea">
      <ul class="container-crea-infos">
        <li class="container-crea-info-nom">{{ montre.nom }}</li>
        <li class="container-crea-info">
          Bracelet Texture
          <span class="container-crea-info-valeur">{{
            montre.bracelet_texture
          }}</span>
          <span class="container-crea-info-prix"
            >{{ montre.bracelet_texture_prix }} €</span
          >
        </li>
        <li class="container-crea-info">
          Boitier Texture
          <span class="container-crea-info-valeur">{{
            montre.boitier_texture
          }}</span>
          <span class="container-crea-info-prix"
            >{{ montre.boitier_texture_prix }} €</span
          >
        </li>
        <li class="container-crea-info">
          Boitier Forme
          <span class="container-crea-info-valeur">{{
            montre.boitier_forme
          }}</span>
          <span class="container-crea-info-prix"
            >{{ montre.boitier_forme_prix }} €</span
          >
        </li>
        <li class="container-crea-info">
          Pierre
          <span class="container-crea-info-valeur">{{
            montre.pierre_nom
          }}</span>
          <span class="container-crea-info-prix"
            >{{ montre.pierre_prix }} €</span
          >
        </li>
        <li class="container-crea-info">
          Prix total :
          <span class="container-crea-info-prix"
            >{{ montre.prix_montre }} €</span
          >
        </li>
        <li class="container-crea-info-message">
          <p v-if="message">{{ message }}</p>
          <p v-else>
            (Enregistrez cette montre pour pouvoir l'ajouter à votre panier)
          </p>
        </li>
      </ul>
    </div> -->
    <div class="container-crea">
      <table class="container-crea-infos">
        <tr class="container-crea-info">
          <th>Nom</th>
          <td>{{ montre.nom }}</td>
          <td>Prix unitaire</td>
        </tr>
        <tr class="container-crea-info">
          <td>Bracelet Texture</td>
          <td class="container-crea-info-valeur">
            {{ montre.bracelet_texture }}
          </td>
          <td class="container-crea-info-prix">
            {{ montre.bracelet_texture_prix }} €
          </td>
        </tr>
        <tr class="container-crea-info">
          <td>Boitier Texture</td>
          <td class="container-crea-info-valeur">
            {{ montre.boitier_texture }}
          </td>
          <td class="container-crea-info-prix">
            {{ montre.boitier_texture_prix }} €
          </td>
        </tr>
        <tr class="container-crea-info">
          <td>Boitier Forme</td>
          <td class="container-crea-info-valeur">{{ montre.boitier_forme }}</td>
          <td class="container-crea-info-prix">
            {{ montre.boitier_forme_prix }} €
          </td>
        </tr>
        <tr class="container-crea-info">
          <td>Pierre</td>
          <td class="container-crea-info-valeur">{{ montre.pierre_nom }}</td>
          <td class="container-crea-info-prix">{{ montre.pierre_prix }} €</td>
        </tr>
        <tr class="container-crea-info">
          <th>Prix total de la montre</th>
          <td class="container-crea-info-prix end" colspan="2">
            {{ montre.prix_montre }} €
          </td>
        </tr>
        <tr class="container-crea-info-message">
          <td colspan="3">
            <p v-if="message">{{ message }}</p>
            <p v-else>
              (Enregistrez cette montre pour pouvoir l'ajouter à votre panier)
            </p>
          </td>
        </tr>
      </table>
    </div>

    <br />
    <hr />
    <br />
    <form
      @submit.prevent="creerMontre"
      method="post"
      class="contaier-form-crea"
    >
      <div class="contaier-form-crea-selection">
        <div class="contaier-form-crea-selection-input">
          <label for="nom">Nom de la Montre</label>
          <input
            class="contaier-form-crea-selection-input-nom"
            type="text"
            name="nom"
            id="nom"
            required
            v-model="montre.nom"
          />
        </div>

        <div class="contaier-form-crea-selection-input">
          <label for="boitier_texture">Texture du Boitier</label>
          <select
            class="contaier-form-crea-selection-select"
            name="boitier_texture"
            id="boitier_texture"
            v-model="montre.boitier_texture"
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

        <div class="contaier-form-crea-selection-input">
          <label for="boitier_forme">Forme du Boitier</label>
          <select
            class="contaier-form-crea-selection-select"
            name="boitier_forme"
            id="boitier_forme"
            v-model="montre.boitier_forme"
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

        <div class="contaier-form-crea-selection-input">
          <label for="bracelet_texture">Texture du Bracelet</label>
          <select
            class="contaier-form-crea-selection-select"
            name="bracelet_texture"
            id="bracelet_texture"
            v-model="montre.bracelet_texture"
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

        <div class="contaier-form-crea-selection-input">
          <label for="pierre">Pierre Préciseuse</label>
          <select
            class="contaier-form-crea-selection-select"
            name="pierre"
            id="pierre"
            v-model="montre.pierre"
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

        <div class="contaier-form-crea-selection-input">
          <label for="main_color">Couleur</label>
          <input
            type="color"
            name="main_color"
            id="main_color"
            v-model="montre.main_color"
          />
        </div>
        <input
          class="contaier-form-crea-selection-btn"
          type="submit"
          value="Enregistrer cette Montre"
        />
      </div>
    </form>
    {{ message }}
  </div>
</template>

<style lang="scss" scoped>
.main-crea {
  background-color: black;
  color: aliceblue;
  text-align: center;
  width: 100vw;
  min-height: 100vh;
  display: grid;
  align-items: center;
}
.contaier-form-crea {
  display: flex;
  flex-direction: column;
  justify-content: center;
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
      &-nom {
        margin-bottom: 1rem;
        padding: 0.5rem;
        border: 1px solid white;
        background-color: black;
        border-radius: 0.65rem;
        color: white;
      }
    }
    &-select {
      margin-bottom: 1rem;
      padding: 0.5rem;
      border: 1px solid white;
      background-color: black;
      border-radius: 0.65rem;
      color: white;
    }
    &-btn {
      position: relative;
    border:2px solid white;
      border-radius: 50px;
      display: inline-grid;
      place-content: center;
      //   font-family: $arc;
      font-size: 15px;
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

// .container-crea {
//   &-infos {
//     background-color: green;
//     display: flex;
//     flex-direction: column;
//     gap: 20px;
//   }
//   &-info {
//     display: flex;
//     justify-content: space-between;
//     flex-direction: row;
//     color: white;
//     list-style: none;
//     &-valeur {
//     }
//     &-nom {
//       background-color: azure;
//       list-style: none;
//     }
//     &-prix {
//     }
//     &-message {
//       color: red;
//       list-style: none;
//     }
//   }
// }
.container-crea {
  .container-crea-infos {
    width: 100%;
    border-collapse: collapse;

    th {
      text-align: left;
    }

    .container-crea-info {
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

    .container-crea-info-message {
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

const router = useRouter();

const boitier_texture = ref([]);
const boitier_forme = ref([]);
const bracelet_texture = ref([]);
const pierre = ref([]);
const user = ref([]);

const message = ref("");
const montre = ref({});

const getMontre = async () => {
  montre.value = {
    nom: "",
    createur: user.value.pseudo,
    boitier_texture: boitier_texture.value[0].nom,
    boitier_texture_prix: boitier_texture.value[0].prix,
    boitier_forme: boitier_forme.value[0].nom,
    boitier_forme_prix: boitier_forme.value[0].prix,
    bracelet_texture: bracelet_texture.value[0].nom,
    bracelet_texture_prix: bracelet_texture.value[0].prix,
    pierre_nom: pierre.value[0].nom,
    pierre_couleur: pierre.value[0].couleur,
    pierre_prix: pierre.value[0].prix,
    main_color: "#999999",
    prix_montre:
      boitier_texture.value[0].prix +
      boitier_forme.value[0].prix +
      bracelet_texture.value[0].prix +
      pierre.value[0].prix,
  };
  console.log(user.value.pseudo);
  console.log(user.value);
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
  user.value = response.data.find((u) => u.userID === store.token);
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
const creerMontre = async () => {
  try {
    const reponse = await client.post(`/montre/add`, montre.value);
    message.value = "Montre créée avec succès";
    router.push(`/montre/${reponse.data.id_montre}`);
  } catch (error) {
    console.error("Erreur lors de la création de la montre :", error.message);
    message.value = "Erreur lors de la création de la montre";
  }
};

onMounted(async () => {
  await getBoitier_Texture();
  await getBoitier_Forme();
  await getBracelet_Texture();
  await getPierre();
  await getUser();
  await getMontre();
});

definePageMeta({
  middleware: [function (to, from) {}, "auth"],
});
</script>
