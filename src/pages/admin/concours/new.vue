<template lang="pug">
ConcourForm
</template>
<script lang="ts" setup>
import ConcourForm from "@/components/ConcourForm.vue";
</script>
<route lang="yaml">
meta:
  layout: authorized
  middlewares: ["isAdmin", "isManager"]
</route>
