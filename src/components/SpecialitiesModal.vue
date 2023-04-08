<template lang="pug">
Modal.show-close-icon.small.specialities-modal(@close="$emit('close')")
  .title Specialities
  .d-flex.mt-3.specialities.flex-row-reverse
    .speciality.py-2.px-1.ms-2(v-for="speciality in specialities" :key="speciality.speciality.id") {{ speciality.speciality.name }}
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import Modal from "@/components/Modal.vue";

defineEmits(["close"]);

const props = defineProps({
  specialities: {
    type: Array as unknown as PropType<
      { speciality: { id: string; name: string } }[]
    >,
    required: true,
  },
});
</script>
