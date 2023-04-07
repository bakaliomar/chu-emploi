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
        button.postouler-btn.btn.rounded-pill.mb-5.px-5.py-2 POSTOULER
  .concours-cards-container(v-else)
    .d-flex.justify-content-center
      .logo-container.mt-5
        img.h-100.w-100(:src="logo")
    .cards-container.row.mt-4.flex-row-reverse
      .col-12.col-md-12.col-lg-6.p-2
        .card.p-4.text-end
          h2.card-title.me-2.mt-2 إطار الممرضين
          .card-body
            .speciality التخصص : ممرض متعدد التخصصات
            .positions-number  عدد المناصب : 13
            .closing-date اخر أجل لإيداع الترشيحات : الجمعة 11 نونبر2022
            .concour-date تاريخ إجراء المباراة : 20 نونبر 2022 على الساعة 08:00 صباحا
            .d-flex.justify-content-between.flex-row-reverse.mt-4
              button.file-btn.btn.rounded-pill.px-5.py-2 إيداع الملف
              button.submit-btn.btn.rounded-pill.px-5.py-2 قرار فتح المباراة
      .col-12.col-md-6.p-2
        .card 2
</template>
<script lang="ts" setup>
import { onBeforeMount } from "vue";
import logo from "@/assets/img/chu-new.png";
import useAxios from "@/composables/useAxios";

const { axios } = useAxios();

onBeforeMount(() => {
  axios
    .get("/concours/published")
    .then(({ data }) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>
<style lang="scss">
.postouler-page {
  height: calc(100vh - 32px);
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
    .card {
      min-height: 320px;
      background-color: white;
      border-radius: 30px;
      color: #10529e;
      line-height: 40px;
      font-weight: 600;

      .card-title {
        font-size: 1.7rem;
      }
      .file-btn {
        background-color: #10529e;
        color: white;
        font-weight: 600;
        letter-spacing: 1px;
        border: 0;
        &:hover {
          background-color: #22aee5;
          cursor: pointer;
        }
      }
      .submit-btn {
        background-color: #22aee5;
        color: white;
        font-weight: 600;
        letter-spacing: 1px;
        border: 0;
        &:hover {
          background-color: #10529e;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
