<template lang="pug">
.candidatures-index.container
  ConfirmModal(ref="confirm_modal")
  h1.primary-title Candidatures List
  .d-flex.justify-content-between.align-items-center
    .d-flex.align-items-center 
      Switcher(v-model="archived" @click="searchPage")
      span.ps-2 Archived
    .right-side
      button.confirm-btn.primary(@click="downloadCsv") Download Csv
      button.confirm-btn.primary.ms-2(@click="downloadExcel") Download Excel
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
  .text-center
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
  router.push({
    name: route.name!,
    query: {
      ...route.query,
      page,
    },
  });
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
      ...route.query,
      page: 1,
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
        keyword: route.query.keyword || undefined,
        concour: route.query.concour || undefined,
        speciality: route.query.speciality || undefined,
        archived: route.query.archived || undefined,
        state: route.query.state || undefined,
        page: route.query.page || 1,
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

function loadConcours() {
  axios
    .get("/concours/admin/autocomplete", {
      params: { archived: archived.value || false },
    })
    .then(({ data }) => {
      concours.value = data;
    });
}

onBeforeMount(() => {
  loadConcours();
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

function downloadCsv() {
  axios
    .get("/candidatures/csv/download", {
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

function downloadExcel() {
  const url = new URL(
    `${import.meta.env.VITE_API_BASE_URL}/candidatures/excel/download`
  );
  const params = new URLSearchParams();
  if (keyword.value) params.set("keyword", keyword.value as string);
  if (concour.value) params.set("concour", concour.value as string);
  if (speciality.value) params.set("speciality", speciality.value as string);
  if (archived.value) params.set("archived", archived.value as string);
  if (state.value) params.set("state", state.value as string);
  url.search = params.toString();
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Authorization", `Bearer ${localStorage.access_token}`);
  xhr.responseType = "arraybuffer";
  xhr.onload = function (e) {
    if (this.status == 200) {
      const blob = new Blob([this.response], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const fileURL = window.URL.createObjectURL(blob);
      const fileLink = document.createElement("a");

      fileLink.href = fileURL;
      fileLink.setAttribute("download", "file.xlsx");
      document.body.appendChild(fileLink);

      fileLink.click();
    }
  };
  xhr.send();
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

watch(
  () => archived.value,
  () => {
    loadConcours();
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
