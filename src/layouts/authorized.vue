<template lang="pug">
#authorized-layout
  Navbar
  #page-content
    RouterView
  #page-footer.text-center Copyright © 2023 CHU Mohammed VI - Tanger
  </template>
<script lang="ts" setup>
import Navbar from "@/components/Navbar.vue";
</script>
<style lang="scss">
#authorized-layout {
  min-height: 100vh;
  #page-content {
    min-height: calc(100vh - 130px);
    height: 100%;
    background-color: #fbfbfc;
  }
  #page-footer {
    font-weight: 700;
    padding-top: 6px;
    padding-bottom: 6px;
  }
}
</style>
