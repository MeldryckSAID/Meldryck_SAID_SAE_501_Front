import type configurationVue from '~/pages/configuration.vue'; import type {
NuxtLink } from '#build/components';
<script setup></script>
<template>
  <div>
    <ul>
      <li><nuxt-link to="/configuration">Config</nuxt-link></li>
      <li><nuxt-link to="/">home</nuxt-link></li>
      <li><nuxt-link to="/user">User</nuxt-link></li>
      <li><nuxt-link to="/panier">cart</nuxt-link></li>
      
    </ul>
  </div>
</template>

<style lang="scss"></style>
