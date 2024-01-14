<template>
  <div class="background">
    <div class="container-home">
      <BtnMybtn to="/register">Inscription</BtnMybtn>
      <BtnMybtn to="/login" variant="reverse">Connexion</BtnMybtn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.background {
  background-color: black;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-content: center;
}
.container-home {
  gap: 30px;
  display: flex;
  justify-content: center;
}
</style>