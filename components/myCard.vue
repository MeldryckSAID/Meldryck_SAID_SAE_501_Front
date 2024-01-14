<template>
  <div class="card">
    <div class="card-content">
      <p class="card-content-nom">{{ valeur.nom }}</p>
      <div class="card-content-info">
        <p class="card-content-info-prix">{{ valeur.prix_montre }} €</p>
      </div>
      <myButton class="card-content-btn" :lien="`/montre/${valeur.montreID}`"
        >Voir Inforation</myButton
      >
    </div>
  </div>
</template>

<style lang="scss" setup>
.card-content {
  border: 2px solid white;
  border-radius: 5%;
  padding: 30px;

  &-nom {
    list-style: none;
  }
}
</style>

<script setup>
defineProps({
  valeur: Object,
});
</script>
