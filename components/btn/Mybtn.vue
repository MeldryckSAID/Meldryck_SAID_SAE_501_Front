<template>
  <nuxt-link :to="to" v-if="to" class="button" :class="className">
    <slot></slot>
  </nuxt-link>

  <button v-else class="button" :class="className">
    <slot></slot>
  </button>
</template>

<style lang="scss">
.button {
  position: relative;
  border: 2px solid black;
  border-radius: 50px;
  display: inline-grid;
  place-content: center;
  //   font-family: $arc;
  font-size: 15px;
  font-weight: 600;
  width: 178px;
  height: 52px;
  overflow: hidden;
  background: linear-gradient(to left, black 50%, white 50%);
  background-size: 200% 100%;
  background-position: 0% 0;
  transition: background-position 0.3s, color 0.3s;
  color: black;
  text-decoration: none;
  &:hover {
    background-position: 100% 0;
    color: white;
    box-shadow: inset 0 0 0 2px  white, 0 0 0;
  }
  &.-reverse {
    color: white;
    background: linear-gradient(to left, white 50%, black 50%);
    background-size: 200% 100%;
    background-position: 0% 0;
    border:2px solid white;
    &:hover {
      background-position: 100% 0;
      color: black;
      box-shadow: inset 0 0 0 2px black, 0 0 0;
    }
  }
}
</style>

<script setup>
const props = defineProps({
  to: String,
  variant: String,
});
const className = computed(() => ({
  //variant
  " -reverse": props.variant === "reverse",

  //color
  " -cblack": props.color === "black",
  " -cwhite": props.color === "white",

  //text
  " -tblack": props.txt === "black",
  " -twhite": props.txt === "white",
}));
</script>