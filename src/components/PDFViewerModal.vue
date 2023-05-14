<template lang="pug">
Modal.show-close-icon.big.pdf-modal
  .row.w-100.pdf-wrapper(vOnClickaway="emit('close')" ref="target")
    PDFViewer.col-12(:source="url" :controls="['download','print','rotate','zoom','catalog','switchPage']" style="height: 80vh; width: 100%" @download="handleDownload")
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Modal from "@/components/Modal.vue";
import PDFViewer from "pdf-viewer-vue";
import { computed } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  source: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const target = ref(null);

onClickOutside(target, () => {
  emit("close");
});

const url = computed(() => {
  return `${import.meta.env.VITE_API_BASE_URL}/concours/${
    props.source
  }/anounce`;
});

function handleDownload(src: { source: string; filename: string }) {
  const fileLink = document.createElement("a");

  fileLink.href = url.value;
  fileLink.setAttribute("download", "anounce.pdf");
  document.body.appendChild(fileLink);

  fileLink.click();
}
</script>
<style lang="scss">
.pdf-modal {
  .pdf-wrapper {
    overflow-x: auto;
  }
}
</style>
