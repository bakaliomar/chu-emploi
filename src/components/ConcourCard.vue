<template lang="pug">
.card.p-4.text-end.d-flex.flex-column
  h2.card-title.me-2.mt-2 {{ concour.name }}
  .card-body.d-flex.flex-column.mt-2.flex-grow-1
    .card-body-contnent.flex-grow-1
      .specialities.d-flex.flex-row-reverse.align-items-center.flex-wrap
        .specialities-title : التخصصات
        .speciality.py-2.px-1.ms-2(v-for="speciality in getSpecialities" :key="speciality.speciality.id") {{speciality.speciality.name}}
        .speciality.py-2.px-1.ms-2.cursor-pointer(@click="$emit('showSpecialities', concour.concourSpeciality)" v-if="concour.concourSpeciality.length > 2") ...
      .positions-number  عدد المناصب : {{ concour.positionsNumber }}
      .closing-date اخر أجل لإيداع الترشيحات : {{ depositDate }}
      .concour-date تاريخ إجراء المباراة : {{ concourDate }}
    .d-flex.justify-content-between.flex-row-reverse
      button.file-btn.btn.rounded-pill.px-5.py-2 إيداع الملف
      button.submit-btn.btn.rounded-pill.px-5.py-2(@click="$emit('showFile', source)") قرار فتح المباراة
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import type { PropType } from "vue";
import useAxios from "@/composables/useAxios";

defineEmits(["showSpecialities", "showFile"]);

const { axios } = useAxios();

const props = defineProps({
  concour: {
    type: Object as PropType<Concour>,
    required: true,
  },
});

const source = ref("");

const getSpecialities = computed(() => {
  return props.concour.concourSpeciality.length > 2
    ? props.concour.concourSpeciality.subarray(0, 3)
    : props.concour.concourSpeciality;
});

function getArabicDay(day: number) {
  return [
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ][day];
}

function getArabicMonth(month: number) {
  return [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "ماي",
    "يونيو",
    "يوليوز",
    "غشت",
    "شتنبر",
    "أكتوبر",
    "نونبر",
    "دجنبر",
  ][month];
}

function getTime(hours: number, minutes: number) {
  if (hours === 0) return `12:${("0" + minutes).slice(-2)} مساء`;
  if (hours > 12)
    return `${Math.floor(hours / 2)}:${("0" + minutes).slice(-2)} مساء`;
  return `${hours}:${("0" + minutes).slice(-2)} صباحا`;
}

const depositDate = computed(() => {
  const date = new Date(props.concour.closingDate);
  return `${getArabicDay(date.getDay())} ${date.getDay() + 1} ${getArabicMonth(
    date.getMonth()
  )} ${date.getFullYear()}`;
});

const concourDate = computed(() => {
  const date = new Date(props.concour.concourDate);
  return `${date.getDay() + 1} ${getArabicMonth(
    date.getMonth()
  )} ${date.getFullYear()}  على الساعة ${getTime(
    date.getHours(),
    date.getMinutes()
  )}`;
});

onMounted(() => {
  axios
    .get(`/concours/${props.concour.id}/anounce`, {
      headers: {
        responseType: "blob",
      },
    })
    .then(({ data }) => {
      source.value = window.URL.createObjectURL(new Blob([data as string]));
    });
});
</script>
<style lang="scss">
.card {
  min-height: 320px;
  background-color: white;
  border-radius: 30px;
  color: #10529e;
  font-weight: 600;
  line-height: 40px;

  .card-title {
    font-size: 1.7rem;
  }
  .card-body {
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
</style>
