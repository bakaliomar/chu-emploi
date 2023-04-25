<template lang="pug">
#authorized-layout
  Navbar
  #page-content.mt-4
    RouterView
  #page-footer.text-center Copyright © 2023 CHU Mohammed VI - Tanger
  </template>
<script lang="ts" setup>
import Navbar from "@/components/Navbar.vue";
</script>
<style lang="scss">
#authorized-layout {
  min-height: 100vh;
  background-color: #fbfbfc;
  #page-content {
    min-height: calc(100vh - 130px);
    height: 100%;
  }
  #page-footer {
    font-weight: 700;
    padding-top: 6px;
    padding-bottom: 6px;
  }
}
</style>
