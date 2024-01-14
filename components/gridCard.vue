<template>
  <ul class="grid_card">
    <li v-for="valeur in valeurMontres">
      <myCard :valeur="valeur" />
    </li>
  </ul>
</template>

<style lang="scss">
.grid_card {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr); // Crée trois colonnes de taille égale
  gap: 20px; // Espacement entre les cartes
  justify-items: center; // Centre les éléments dans chaque colonne
  margin: 20px; // Espacement autour de la grille
}
</style>

<script setup>
const props = defineProps({
  valeurMontres: Object,
});
</script>
