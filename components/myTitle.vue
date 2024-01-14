<!-- <template>
    <div class="my_title">
        <h1 class="my_title__texte"><slot class="my_title__texte-valeur"/></h1>
    </div>
</template>

<style lang="scss">
.my_title{
  

    &__texte{
      color: red;
    }
}
</style> -->

<script setup>
import { computed } from "vue";

const props = defineProps({
  el: String,
  size: String,
  color: String,
  font: String,
});

const className = computed(() => ({
  title: true,

  //size
  "-xl": props.size === "xlarge",
  "-l": props.size === "large",
  "-m": props.size === "medium",
  "-s": props.size === "small",

  //color

  " -sprimary": props.color === "primary",

  //font
  " -okine": props.font === "okine",
  " -arc": props.font === "archivo",
  " -roashe": props.font === "roashe",
}));
</script>
<template>
  <h4 v-if="el === 'h4'" :class="className">
    <slot></slot>
  </h4>
  <h3 v-else-if="el === 'h3'" :class="className">
    <slot></slot>
  </h3>
  <h2 v-else-if="el === 'h2'" :class="className">
    <slot></slot>
  </h2>
  <h1 v-else :class="className">
    <slot></slot>
  </h1>
</template>

<style lang="scss" scoped>
.title {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 24px;
  font-weight: 700;
  word-wrap: break-word;
  > span {
    color: red;
  }
  &.-xl {
    font-size: 24px;
  }
  &.-l {
    font-size: 20px;
  }
  &.-m {
    font-size: 18px;
  }
  &.-s {
    font-size: 16px;
  }
  &.-sprimary {
    color: white;
  }
  &.-okine {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
  &.-arc {
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  }
  &.-roashe {
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  }
  @media (max-width: 425px) {
    font-size: 1.5rem;
    font-weight: 700;
    word-wrap: break-word;
    > span {
      color: red;
    }
    &.-xl {
      font-size: 20px;
    }
    &.-l {
      font-size: 18px;
    }
    &.-m {
      font-size: 16px;
    }
    &.-s {
      font-size: 14px;
    }
    &.-sprimary {
      color: white;
    }
    &.-okine {
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }
    &.-arc {
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    }
    &.-roashe {
      font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    }
  }
}
</style>
