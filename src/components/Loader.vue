<template lang="pug">
.loader
  .text-center
    img.commonshare-logo(:src="logo" :class="{ white }")
  </template>

<script lang="ts" setup>
import logo from "@/assets/img/loading.gif";

defineProps({
  white: Boolean,
});
</script>

<style lang="scss">
.loader {
  font-size: 10px;
  margin: 25px auto;

  .white {
    padding: 10px;
    border-radius: 50%;
    background-color: #fff;
  }
}
</style>
