<template lang="pug">
Modal.show-close-icon.big.pdf-modal
  .row
    PDFViewer.col-12(:source="url" :controls="['download','print','rotate','zoom','catalog','switchPage']" style="height: 80vh;" @download="handleDownload")
</template>
<script lang="ts" setup>
import Modal from "@/components/Modal.vue";
import PDFViewer from "pdf-viewer-vue";
import { computed } from "vue";

const props = defineProps({
  source: {
    type: String,
    required: true,
  },
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
