<template lang="pug">
.candidatures-index.container
  ConfirmModal(ref="confirm_modal")
  h1.primary-title Candidatures List
  .d-flex.justify-content-between.align-items-center
    .d-flex.align-items-center 
      Switcher(v-model="archived" @click="searchPage")
      span.ps-2 Archived
    button.confirm-btn.primary(@click="downloadData") Download
  .filters-container.d-flex.justify-content-between.align-items-end.mt-3
    .filters.d-flex.align-items-center
      .form-group.filter-group
        label Recherche de candidats
        input.form-control.filters-input.shadow.bg-body.rounded(type="search" v-model="keyword" placeholder="Recherche de candidats" @change="searchPage")
      .filter-group.ms-2
        label Status
        select.form-select.shadow.bg-body.rounded(@click="searchPage" v-model="state")
          option(disabled selected) Choisis une status
          option(value="UNTREATED") Non traités
          option(value="SHORTLISTED") Présélectionnés
          option(value="REFUSED") Refusés
          option(value="ADMITTED") Admis définitivement
      .filter-group.ms-2
        label Concour
        select.form-select.shadow.bg-body.rounded(@click="searchPage" v-model="concour")
          option(disabled selected) Choisis une cocnour
          option(v-for="item in concours" :key="item.id" :value="item.id") {{ item.name }}
      .filter-group.ms-2(v-if="!!concour")
        label Speciality
        select.form-select.shadow.bg-body.rounded(@click="searchPage" v-model="speciality")
          option(disabled selected) Choisis une speciality
          option(v-for="item in specialities" :key="item.id" :value="item.id") {{ item.name }}
    RouterLink.clear-filters.action(:to="route.path" v-if="showClear") clear filters
  Table.bordered.mt-4(:header="header" :data="candidatures")
    template(v-slot:loading v-if="loading")
      Loader
    template(v-slot:user.lastName="{ row }")
      RouterLink.candidatures-item.action(:to="{ name: 'admin_candidatures_id', params: { id: row.id } }" target="_blank") {{row.user.lastName}}
    template(v-slot:user.email="{ col }")
      a.candidatures-item.action(:href="`mailto:${col}`") {{ col }}
    template(v-slot:state="{ col }")
      .candidatures-item.badge(:class="col") {{ getState(col) }}
    template(#not_found)
      Notfound(entity="Candidature")
  Paginate(:paginate="pagination" @page-changed="pageChanged" )
</template>
<script lang="ts" setup>
import { ref, watch, computed, onBeforeMount } from "vue";
import format from "date-fns/formatISO9075";
import useAxios from "@/composables/useAxios";
import Table from "@/components/Table.vue";
import Loader from "@/components/Loader.vue";
import Options from "@/components/Options.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
import { useNotification } from "@kyvg/vue3-notification";
import { startCase, isEmpty } from "lodash";
import { useRouter, useRoute } from "vue-router";
import "bootstrap/dist/css/bootstrap.min.css";
import Notfound from "@/components/Notfound.vue";
import Switcher from "@/components/Switcher.vue";
import Paginate from "@/components/Pagination.vue";

const { axios } = useAxios();
const router = useRouter();
const route = useRoute();
const candidatures = ref<CandidatureIndex[]>([]);
const concours = ref<{ id: string; name: string }[]>([]);
const specialities = ref<{ id: string; name: string }[]>([]);
const pagination = ref<Paginate>({
  currentPage: 0,
  lastPage: 0,
  next: null,
  perPage: 0,
  prev: null,
  total: 0,
});
const loading = ref(false);
const confirm_modal = ref<typeof ConfirmModal | null>(null);
const keyword = ref(route.query.keyword);
const concour = ref(route.query.concour);
const speciality = ref(route.query.speciality);
const archived = ref(route.query.archived);
const state = ref(route.query.state);

const header: Header[] = [
  {
    key: "user.title",
    value: "Civilité",
  },
  {
    key: "user.cin",
    value: "CIN",
  },
  {
    key: "user.lastName",
    value: "Nom",
  },
  {
    key: "user.firstName",
    value: "Prénom",
  },
  {
    key: "concour.name",
    value: "Concours",
  },
  {
    key: "speciality.name",
    value: "Spécialité",
  },
  {
    key: "user.email",
    value: "Email",
  },
  {
    key: "establishment",
    value: "Etabl",
  },
  {
    key: "state",
    value: "Status",
  },
];

function pageChanged(page: number) {
  pagination.value.currentPage = page;
}

function getState(state: string) {
  return {
    UNTREATED: "Non traité",
    SHORTLISTED: "Présélectionné",
    REFUSED: "Refusé",
    ADMITTED: "Admis définitivement",
  }[state];
}

const showClear = computed(() => {
  return !isEmpty(route.query);
});

const searchPage = () => {
  router.push({
    name: route.name!,
    query: {
      keyword: keyword.value || undefined,
      concour: concour.value || undefined,
      speciality: speciality.value || undefined,
      archived: archived.value || undefined,
      state: state.value || undefined,
    },
  });
};

function loadCandidatures() {
  loading.value = true;
  axios
    .get("/candidatures", {
      params: {
        keyword: keyword.value || undefined,
        concour: concour.value || undefined,
        speciality: speciality.value || undefined,
        archived: archived.value || undefined,
        state: state.value || undefined,
        page: pagination.value.currentPage || 1,
        perPage: 10,
      },
    })
    .then(({ data }) => {
      candidatures.value = data.data;
      pagination.value = data.meta;
    })
    .finally(() => {
      loading.value = false;
    });
}

onBeforeMount(() => {
  axios.get("/concours/autocomplete").then(({ data }) => {
    concours.value = data;
  });
});

function loadSpecialities() {
  if (!concour.value) {
    specialities.value = [];
  } else {
    axios.get(`/concours/${concour.value}/specialities`).then(({ data }) => {
      specialities.value = data;
    });
  }
}

function downloadData() {
  axios
    .get("/candidatures/excel/download", {
      headers: {
        responseType: "blob",
      },
      params: {
        keyword: keyword.value || undefined,
        concour: concour.value || undefined,
        speciality: speciality.value || undefined,
        archived: archived.value || undefined,
        state: state.value || undefined,
      },
    })
    .then(({ data }) => {
      const fileURL = window.URL.createObjectURL(new Blob([data as string]));
      const fileLink = document.createElement("a");

      fileLink.href = fileURL;
      fileLink.setAttribute("download", "Candidatures.csv");
      document.body.appendChild(fileLink);

      fileLink.click();
    });
}

watch(
  () => route,
  () => {
    keyword.value = route.query.keyword;
    concour.value = route.query.concour;
    speciality.value = route.query.speciality;
    archived.value = route.query.archived;
    state.value = route.query.state;
    loadCandidatures();
  },
  { immediate: true, deep: true }
);

watch(
  () => concour.value,
  () => {
    loadSpecialities();
  },
  { immediate: true }
);
</script>
<style lang="scss"></style>
<route lang="yaml">
meta:
  layout: authorized
  middlewares: ["isAdmin", "isManager"]
</route>
