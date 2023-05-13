<template lang="pug">
.container.postouler-page
  SpecialitiesModal(:specialities="selectedSpecialities" v-if="specialityshow" @close="specialityshow = false")
  PDFViewerModal(:source="source" v-if="showPdf" @close="showPdf = false")
  .rejoindre-card-container.d-flex.align-items-center(v-if="!openConcours")
    .rejoindre-card.d-flex.flex-column
      .d-flex.justify-content-center
        .logo-container.mt-5
          img.h-100.w-100(:src="logo")
      h1.title.mt-4.ms-4.mb-2.text-center
        |Rejoindre
        br
        |l'equipe du Centre Hospitalier Universitaire
        br
        |Mohammed VI - Tanger
      .postouler-btn-container.d-flex.justify-content-center.mt-auto
        button.postouler-btn.btn.rounded-pill.mb-5.px-5.py-2(@click="openConcours = true" :disabled="!concours.length" :class="{'disabled': !concours.length}" type="button") POSTULER
  .concours-cards-container.h-100(v-else)
    .d-flex.justify-content-center
      .logo-container.mt-5
        img.h-100.w-100(:src="logo")
    .cards-container.row.mt-4.flex-row-reverse
      .col-12.col-md-12.col-lg-6.p-2(v-for="concour in concours" :key="concour.id")
        ConcourCard(:concour="concour" @showSpecialities="showSpecialities" @showFile="showFile")
</template>
<script lang="ts" setup>
import { ref, onBeforeMount, computed } from "vue";
import logo from "@/assets/img/chu-new.png";
import useAxios from "@/composables/useAxios";
import ConcourCard from "@/components/ConcourCard.vue";
import SpecialitiesModal from "@/components/SpecialitiesModal.vue";
import PDFViewerModal from "@/components/PDFViewerModal.vue";
import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();

const { axios } = useAxios();
const openConcours = ref(false);
const selectedSpecialities = ref<
  { speciality: { id: string; name: string } }[]
>([]);
const specialityshow = ref(false);
const showPdf = ref(false);
const source = ref("");

const concours = ref<Concour[]>([]);
const pagination = ref<Paginate>({
  currentPage: 0,
  lastPage: 0,
  next: null,
  perPage: 0,
  prev: null,
  total: 0,
});

function showSpecialities(
  specs: { speciality: { id: string; name: string } }[]
) {
  specialityshow.value = true;
  selectedSpecialities.value = specs;
}

function showFile(src: string) {
  source.value = src;
  showPdf.value = true;
}

onBeforeMount(() => {
  axios.get("/concours/published").then(({ data }) => {
    concours.value = data.data;
    pagination.value = data.meta;
  });
});
</script>
<style lang="scss">
.postouler-page {
  height: 100%;
  min-height: calc(100vh - 32px);
  padding: 16px;
  .rejoindre-card-container {
    min-height: calc(100vh - 64px);
    .rejoindre-card {
      min-height: 60vh;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 30px;
      box-shadow: $box-shadow--modal;

      .logo-container {
        width: 160px;
        height: 160px;
      }
      .title {
        font-weight: 700;
        word-spacing: 8px;
        color: #10529e;
      }
      .postouler-btn {
        background-color: #10529e;
        color: white;
        font-weight: 600;
        font-size: 1.8rem;
        letter-spacing: 1px;
        border: 0;
        &:hover {
          background-color: #22aee5;
          cursor: pointer;
        }
        &.disabled {
          background-color: $muted-color;
        }
      }
    }
  }
  .concours-cards-container {
    .logo-container {
      width: 120px;
      height: 120px;
    }
  }
}
</style>
<route lang="json5">
{
  meta: {
    auth: "guest",
  },
}
</route>
