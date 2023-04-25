<template lang="pug">
.concours-index.container
  .d-flex.justify-content-between.align-items-center
    h1.title Concours
    .ajouter-btn
      RouterLink(to="/concours/new") + Ajouter 
  Table.bordered.mt-3(:header="header" :data="concours")
    template(v-slot:loading v-if="loading")
      Loader
    template(v-slot:location="{ col }")
      .concours-item {{ col ? col : "N/A" }}
    template(v-slot:closingDate="{ col }")
      .concours-item {{ dateFormat(col) }}
    template(v-slot:concourDate="{ col }")
      .concours-item {{ dateFormat(col) }}
    template(v-slot:closed={ col })
      .concours-item.text-center
        svg.check(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" v-if="col")
          path(d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z")
        svg.xmark(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" v-else)
          path(d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z")


</template>
<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import format from "date-fns/formatISO9075";
import useAxios from "@/composables/useAxios";
import Table from "@/components/Table.vue";
import Loader from "@/components/Loader.vue";

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
const loading = ref(false);

const header: Header[] = [
  {
    key: "name",
    value: "Concour Name",
  },
  {
    key: "location",
    value: "Lieu du poste",
  },
  {
    key: "positionsNumber",
    value: "Postes Nombre",
    align: "center",
  },
  {
    key: "closingDate",
    value: "Date de clôture",
  },
  {
    key: "concourDate",
    value: "Date de clôture",
  },
  {
    key: "closed",
    value: "Clôturée?",
    align: "center",
  },
  {
    key: "anounce",
    value: "Anounce",
  },
];

function dateFormat(val: string): string {
  return val ? format(new Date(val)) : "N/A";
}

function loadConcours() {
  loading.value = true;
  axios
    .get("/concours")
    .then(({ data }) => {
      concours.value = data.data;
      pagination.value = data.meta;
    })
    .finally(() => {
      loading.value = false;
    });
}

onBeforeMount(() => {
  loadConcours();
});
</script>

<style lang="scss">
.concours-index {
  .ajouter-btn a {
    text-decoration: none;
    color: $primary-color;
    size: 24px;
    font-weight: 600;
    line-height: 40px;
    letter-spacing: 1px;
  }

  .concours-item {
    svg {
      width: 28px;
      height: 28px;

      &.check {
        fill: $success-color;
      }
      &.xmark {
        fill: $error-color;
      }
    }
  }
}
</style>
<route lang="yaml">
meta:
  layout: authorized
  middlewares: ["isAdmin", "isManager"]
</route>
