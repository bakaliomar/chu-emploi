<template lang="pug">
.concours-index.container
  .title Concours 
  Table.bordered(:header="header" :data="concours")
</template>
<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import useAxios from "@/composables/useAxios";
import Table from "@/components/Table.vue";

// name              String
// description       String
// location          String?
// positionsNumber   Int
// closingDate
// concourDate
// closed
// anounce

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
    key: "location ",
    value: "Lieu du poste",
  },
  {
    key: "positionsNumber",
    value: "Postes Nombre",
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
  },
  {
    key: "anounce",
    value: "Anounce",
  },
];

onBeforeMount(() => {
  axios.get("/concours").then(({ data }) => {
    concours.value = data.data;
    pagination.value = data.meta;
  });
});
</script>

<style lang="scss"></style>
<route lang="yaml">
meta:
  layout: authorized
</route>
