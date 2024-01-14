<script setup></script>
<template>
  <div class="footer-content">
    <!-- <nuxt-link to="/"> <MyLogo class="footer-content-logo" /></nuxt-link>-->
    <nuxt-link to="/"> <LogoMyLogo name="white" class="footer-content-logo" /></nuxt-link>
    <ul class="footer-content-links">
      <li class="footer-content-links-link">
        <nuxt-link to="/configuration">Config</nuxt-link>
      </li>
      <li class="footer-content-links-link">
        <nuxt-link to="/user">User</nuxt-link>
      </li>
      <li class="footer-content-links-link">
        <nuxt-link to="/panier">cart</nuxt-link>
      </li>
      <li class="footer-content-links-link">
        <nuxt-link to="/connexion">connexion</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.footer-content {
  border-top: 3px white dashed;
  padding: 2%;
  color: white;
  height: 100px;
  background-color: black;
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
      background-color: white;
      color: white;
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
      background-color: white;
      color: white;
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
