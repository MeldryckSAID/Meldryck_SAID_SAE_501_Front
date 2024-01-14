<script setup>
import { computed } from "vue";

import white from "../components/logo/logos/LogoW.vue";
import black from "../components/logo/logos/LogoB.vue";


const props = defineProps({
  name: String,
  color: String,
  stroke: String,
  size: String,
  fill: String,
});
const getIcon = computed(() => {
  switch (props.name) {
    case "black":
      return black;
    case "white":
      return white;


    default:
      return black;
  }
});

const className = computed(() => ({
  " -primary": props.color === "primary",
  " -secondary": props.color === "secondary",

  " -sprimary": props.stroke === "primary",
  " -ssecondary": props.stroke === "secondary",


  " -small": props.size === "small",
  " -regular": props.size === "regular",
  " -big": props.size === "big",

  " -fblack": props.fill === "black",
  " -fsans": props.fill === "base",
  " -fwhite": props.fill === "white",
}));
</script>

<template>
  <i :class="className" class="icon">
    <component :is="getIcon" />
  </i>
</template>

<style lang="scss" scoped>
.icon {
  align-items: center;
  display: inline-flex;
  // height: rem(50);
  justify-content: center;
  // width: rem(50);

  //background
  &.-primary {
    background: black;
  }
  &.-secondary {
    background: white;
  }
  //stroke

  &.-sprimary {
    color: white;
  }
  &.-ssecondary {
    color: black;
  }

  //Size
  &.-small {
    svg {
      scale: 0.5;
    }
    height: 50px;
    width: 50px;
  }
  &.-regular {
    height: 70px;
    width: 70px;
    svg {
      scale: 0.7;
      padding: 10px;
    }
  }
  &.-big {
    svg {
      scale: 1;
      padding: 10px;
    }
    height: 100px;
    width: 100px;
  }
}
</style>
