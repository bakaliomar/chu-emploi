<template lang="pug">
Modal.show-close-icon.big.pdf-modal
  .row
    PDFViewer.col-12(:source="source" :controls="['download','print','rotate','zoom','catalog','switchPage']" style="height: 80vh;" @download="handleDownload")
</template>
<script lang="ts" setup>
import Modal from "@/components/Modal.vue";
import PDFViewer from "pdf-viewer-vue";

const props = defineProps({
  source: {
    type: String,
    required: true,
  },
});

function handleDownload(src: { source: string; filename: string }) {
  const fileLink = document.createElement("a");

  fileLink.href = props.source;
  fileLink.setAttribute("download", "anounce.pdf");
  document.body.appendChild(fileLink);

  fileLink.click();
}
</script>
