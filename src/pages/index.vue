<template lang="pug">
.container.postouler-page
  .d-flex.align-items-center.h-100(v-if="false")
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
        button.postouler-btn.btn.rounded-pill.mb-5.px-5.py-2 POSTULER
  .concours-cards-container.h-100(v-else)
    .d-flex.justify-content-center
      .logo-container.mt-5
        img.h-100.w-100(:src="logo")
    .cards-container.row.mt-4.flex-row-reverse
      .col-12.col-md-12.col-lg-6.p-2(v-for="concour in concours" :key="concour.id")
        ConcourCard(:concour="concour")
</template>
<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import logo from "@/assets/img/chu-new.png";
import useAxios from "@/composables/useAxios";
import ConcourCard from "@/components/ConcourCard.vue";
const { axios } = useAxios();

const concours = ref<Concour[]>([]);
const pagination = ref<Paginate>({
  currentPage: 0,
  lastPage: 0,
  next: null,
  perPage: 0,
  prev: null,
  total: 0,
});

onBeforeMount(() => {
  axios
    .get("/concours/published")
    .then(({ data }) => {
      concours.value = data.data;
      pagination.value = data.meta;
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>
<style lang="scss">
.postouler-page {
  height: 100%;
  padding: 16px;
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
