<template>
  <main class="main-montre">
    <myTitle>Les Montres</myTitle>

    <div class="container-filtres">
      <div class="container-filtres-filtre">
        <label for="boitier_forme">Forme du Boitier</label>
        <select
          class="container-filtres-filtre-select"
          name="boitier_forme"
          id="boitier_forme"
          v-model="selectedForme"
        >
          <option value="">tous</option>
          <option
            v-for="b in boitier_forme"
            :key="b.id_boitier_forme"
            :value="b.nom"
          >
            {{ b.nom }}
          </option>
        </select>
      </div>

      <div class="container-filtres-filtre">
        <label for="bracelet_texture">Texture du Bracelet</label>
        <select
          class="container-filtres-filtre-select"
          name="bracelet_texture"
          id="bracelet_texture"
          v-model="selectedBracelet"
        >
          <option value="">toutes</option>
          <option
            v-for="b in bracelet_texture"
            :key="b.id_bracelet_texture"
            :value="b.nom"
          >
            {{ b.nom }}
          </option>
        </select>
      </div>

      <div class="container-filtres-filtre">
        <label for="pierre">Pierre Précieuse</label>
        <select
          class="container-filtres-filtre-select"
          name="pierre"
          id="pierre"
          v-model="selectedPierre"
        >
          <option value="">toutes</option>
          <option v-for="p in pierres" :key="p.id_pierre" :value="p.nom">
            {{ p.nom }}
          </option>
        </select>
      </div>
    </div>

    <gridCard :valeurMontres="listeMontre" />

    <div class="container-btn">
      <div class="container-btn-affichage">
        <myButton @click="lessMontre()" v-if="montreMin"
          >Moins de Montres</myButton
        >
        <myButton variant="reverse" @click="moreMontre()" v-if="montreTotal"
          >Plus de Montres</myButton
        >
      </div>
      <div class="container-btn-création">
        <myButton v-if="store.token" lien="/montre/creation"
          >Créer ma montre de zéro</myButton
        >
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.main-montre {
  background-color: black;
  color: aliceblue;
  text-align: center;
  width: 100vw;
  min-height: 100vh;
  display: grid;
  align-items: center;
}

.container-filtres {
  display: flex;
  justify-content: space-evenly;
  &-filtre {
    display: flex;
    flex-direction: column;
    gap: 10px;
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

.container-btn {
  display: flex;
  justify-content: space-evenly;
  &-affichage {
    display: flex;
    gap: 30px;
  }
}
</style>

<script setup>
import { client } from "@/utils/axios";

const store = useGlobalStore();

const montres = ref([]);

const boitier_forme = ref([]);
const selectedForme = ref("");

const bracelet_texture = ref([]);
const selectedBracelet = ref("");

const pierres = ref([]);
const selectedPierre = ref("");

// récupération de toutes les tables nécéessaires à l'affichage des montres et des filtres
const getMontres = async () => {
  const response = await client.get(`/montre`);
  montres.value = response.data;
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
  pierres.value = response.data;
};

// Filtrer les montres en fonction de la pierre et de la forme sélectionnées
const filteredMontres = computed(() => {
  let filtered = montres.value;

  if (selectedForme.value) {
    filtered = filtered.filter((m) => m.boitier_forme === selectedForme.value);
  }

  if (selectedBracelet.value) {
    filtered = filtered.filter(
      (m) => m.bracelet_texture === selectedBracelet.value
    );
  }

  if (selectedPierre.value) {
    filtered = filtered.filter((m) => m.pierre_nom === selectedPierre.value);
  }

  return filtered;
});

// nombre de montre à afficher
const nbrMontre = ref(1);

// augmente le nombre de montre à afficher
const moreMontre = () => {
  nbrMontre.value++;
};

// dimunue le nombre de montre à afficher
const lessMontre = () => {
  nbrMontre.value--;
};

// fonction pour filtrer le nombre de Montre à affiché
const listeMontre = computed(() => {
  if (filteredMontres.value) {
    return filteredMontres.value.slice(0, 3 * nbrMontre.value);
  } else {
    return [];
  }
});

// pour cacher le bouton "plus de montre" si elles sont toutes affichées
const montreTotal = computed(() => {
  return listeMontre.value.length < filteredMontres.value.length;
});

// pour cacher le bouton "plus de montre" si elles sont toutes affichées
const montreMin = computed(() => {
  return listeMontre.value.length > +3;
});

// chargement de la base de données
onMounted(async () => {
  await getMontres();
  await getBoitier_Forme();
  await getBracelet_Texture();
  await getPierre();
});
</script>
