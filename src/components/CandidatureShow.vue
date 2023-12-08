<template lang="pug">
.candidature-show
  .pair-title-value
    .pair-title Concour:
    .pair-value {{ candidature.concour?.name || ""}}
  .pair-title-value
    .pair-title Spécialité:
    .pair-value {{ candidature.speciality?.name || "" }}
  .pair-title-value
    .pair-title Titre:
    .pair-value {{ candidature.user.title }}
  .pair-title-value
    .pair-title CIN:
    .pair-value {{ candidature.user.cin }}
  .d-flex.justify-content-between.align-items-center
    .pair-title-value
      .pair-title Prénom:
      .pair-value {{ candidature.user.firstName }}
    .pair-title-value.arabic 
      .pair-title : الإسم الشخصي
      .pair-value {{ candidature.user.firstNameArabic }}
  .d-flex.justify-content-between.align-items-center
    .pair-title-value
      .pair-title Nom:
      .pair-value {{ candidature.user.lastName }}
    .pair-title-value.arabic 
      .pair-title : الإسم العائلي
      .pair-value {{ candidature.user.lastNameArabic }}
  .pair-title-value
    .pair-title Date de naissance:
    .pair-value {{ dateFormat(candidature.user.birthDate) }}
  .d-flex.justify-content-between.align-items-center
    .pair-title-value
      .pair-title Lieu de naissance:
      .pair-value {{ candidature.user.birthPlace }}
    .pair-title-value.arabic 
      .pair-title : مكان الازدياد
      .pair-value {{ candidature.user.birthPlaceArabic }}
  .d-flex.justify-content-between.align-items-center
    .pair-title-value
      .pair-title Adresse:
      .pair-value {{ candidature.user.address }}
    .pair-title-value.arabic 
      .pair-title : العنوان
      .pair-value {{ candidature.user.addressArabic }}
  .d-flex.justify-content-between.align-items-center
    .pair-title-value
      .pair-title Ville:
      .pair-value {{ candidature.user.city }}
    .pair-title-value.arabic 
      .pair-title : المدينة
      .pair-value {{ candidature.user.cityArabic }}
  .pair-title-value
    .pair-title Code postal:
    .pair-value {{ candidature.user.postalCode }}
  .pair-title-value
    .pair-title Email:
    .pair-value {{ candidature.user.email }}
  .pair-title-value
    .pair-title Téléphone:
    .pair-value {{ candidature.user.phone }}
  .pair-title-value
    .pair-title Titre du diplôme:
    .pair-value {{ candidature.degreeTitle }}
  .pair-title-value
    .pair-title Spécialité du diplôme:
    .pair-value {{ candidature.degreeSpeciality }}
  .pair-title-value
    .pair-title Nom de l’établissement:
    .pair-value {{ candidature.establishmentName }}
  .pair-title-value
    .pair-title Etablissement:
    .pair-value {{ candidature.establishment }}
  .pair-title-value
    .pair-title Année d’obtention:
    .pair-value {{ candidature.graduationYear }}
  .pair-title-value
    .pair-title Pays:
    .pair-value {{ candidature.graduationCountry }}
  .pair-title-value
    .pair-title Profession actuelle:
    .pair-value {{ candidature.currentJob }}
  .pair-title-value
    .pair-title Documents attachés:
    .pair-value
      a(:href="source" target="_blank") dossierlien
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import type { PropType } from "vue";
import format from "date-fns/formatISO9075";
import useAxios from "@/composables/useAxios";

const props = defineProps({
  candidature: {
    type: Object as PropType<CandidatureShow>,
    required: true,
  },
});

const { axios } = useAxios();
const source = ref<unknown | null>(null);

const isEdit = computed(() => {
  return !!props.candidature.id;
});

function dateFormat(val: string): string {
  return val ? format(new Date(val)) : "N/A";
}

onMounted(() => {
  if (isEdit.value) {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `${import.meta.env.VITE_API_BASE_URL}/candidatures/${
        props.candidature.id
      }/dossier`,
      true
    );
    xhr.setRequestHeader(
      "Authorization",
      `Bearer ${localStorage.access_token}`
    );
    xhr.responseType = "arraybuffer";
    xhr.onload = function (e) {
      if (this.status == 200) {
        const blob = new Blob([this.response], { type: "application/pdf" });
        source.value = window.URL.createObjectURL(blob);
      }
    };
    xhr.send();
  } else {
    source.value = window.URL.createObjectURL(props.candidature.file!);
  }
});
</script>
<style lang="scss">
.pair-title-value {
  display: flex;
  .pair-title {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 45px;
  }

  .pair-value {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 45px;
    margin-left: 8px;
  }

  &.arabic {
    flex-direction: row-reverse;
    .pair-value {
      margin-right: 8px;
    }
  }
}
</style>
