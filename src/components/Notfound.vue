<template lang="pug">
.entity-not-found
  img(:src="empty")
  .text-center.mt-3 No {{entity}} Found
  </template>

<script lang="ts" setup>
import empty from "@/assets/img/empty.png";

const props = defineProps({
  entity: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss">
.entity-not-found {
  padding: 5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
  font-weight: 500;
  color: $primary-color;

  .not-found {
    margin-top: 5px;
    margin-right: 5px;
  }
}
</style>
