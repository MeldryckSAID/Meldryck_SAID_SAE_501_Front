<script setup></script>
<template>
  <div class="header-content">
    <!-- <nuxt-link to="/"> <MyLogo class="header-content-logo" /></nuxt-link>-->
    <nuxt-link to="/"> <LogoMyLogo name="black" class="header-content-logo" /></nuxt-link>
    <ul class="header-content-links">
      <li class="header-content-links-link">
        <nuxt-link to="/profile">Mon espace</nuxt-link>
      </li>
      <li class="header-content-links-link">
        <nuxt-link to="/montre">Nos montre</nuxt-link>
      </li>
  
      <li class="header-content-links-link">
        <nuxt-link to="/register">M'inscricre</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.header-content {
  height: 100px;
  background-color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  &-logo {
    width: 6rem;
  }
  &-links {
    display: flex;
    gap: 30px;
    list-style: none;
    a {
      color: inherit;
      text-decoration: none;
    }
    &-link::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(50%);
      width: 0%;
      height: 4px;
      background-color: black;
      color: black;
      transition: width 0.3s ease-out, left 0.3s ease-out;
    }

    &-link::before {
      content: "";
      position: absolute;
      bottom: 0;
      right: 50%;
      transform: translateX(-50%);
      width: 0%;
      height: 4px;
      background-color: black;
      color: black;
      transition: width 0.3s ease-out, right 0.3s ease-out;
    }

    &-link:hover::after {
      width: 50%;
      left: 0%;
    }

    &-link:hover::before {
      width: 50%;
      right: 0%;
    }
    &-link {
      position: relative;
      padding-bottom: 10px;
    }
  }
}
</style>
