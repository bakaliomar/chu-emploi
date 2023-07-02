<template lang="pug">
.users-index.container
  ConfirmModal(ref="confirm_modal")
  .d-flex.justify-content-between.align-items-center
    h1.primary-title Specialities List
    .ajouter-btn + Ajouter 
  .filters-container.d-flex.justify-content-between.align-items-end.mt-3
    .filters.d-flex.align-items-center
      .form-group.filter-group
        label Recherche de user
        input.form-control.filters-input.shadow.bg-body.rounded(type="search" v-model="keyword" placeholder="Recherche de user" @change="searchPage")
      .filter-group.ms-2
        label Roles
        select.form-select.shadow.bg-body.rounded(@click="searchPage" v-model="roles")
          option(disabled selected) Choisis une status
          option(value="USER") User
          option(value="MANAGER") Manager
          option(value="ADMIN") Admin
    RouterLink.clear-filters.action(:to="route.path" v-if="showClear") clear filters
  Table.bordered.mt-3(:header="header" :data="users")
    template(v-slot:loading v-if="loading")
      Loader
    template(v-slot:options="{ row }")
      Options.justify-content-end
        .menu-item() Editer
        .menu-item.text-start.text-danger() Suprimer
    template(#not_found)
      Notfound(entity="Users")
  .text-center
    Paginate(:paginate="pagination" @page-changed="pageChanged" )
</template>
<script lang="ts" setup>
import { ref, watch, computed, onBeforeMount } from "vue";
import useAxios from "@/composables/useAxios";
import { useRouter, useRoute } from "vue-router";
import { startCase, isEmpty } from "lodash";
import ConfirmModal from "@/components/ConfirmModal.vue";
import Table from "@/components/Table.vue";
import Loader from "@/components/Loader.vue";
import Notfound from "@/components/Notfound.vue";
import Paginate from "@/components/Pagination.vue";
import Options from "@/components/Options.vue";

const { axios } = useAxios();
const router = useRouter();
const route = useRoute();

const users = ref<CurrentUser[]>([]);
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
const roles = ref(route.query.roles);

const header: Header[] = [
  {
    key: "firstName",
    value: "Prenom",
  },
  {
    key: "lastName",
    value: "Nom",
  },
  {
    key: "cin",
    value: "CIN",
  },
  {
    key: "email",
    value: "Email",
  },
  {
    key: "roles",
    value: "Role",
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

const showClear = computed(() => {
  return !isEmpty(route.query);
});

const searchPage = () => {
  router.push({
    name: route.name!,
    query: {
      ...route.query,
      keyword: keyword.value || undefined,
      roles: roles.value || undefined,
    },
  });
};

function loadUsers() {
  loading.value = true;
  axios
    .get("/users", {
      params: {
        keyword: route.query.keyword || undefined,
        roles: route.query.roles || undefined,
        page: route.query.page || 1,
        perPage: 10,
      },
    })
    .then(({ data }) => {
      users.value = data.data;
      pagination.value = data.meta;
    })
    .finally(() => {
      loading.value = false;
    });
}

watch(
  () => route,
  () => {
    keyword.value = route.query.keyword;
    roles.value = route.query.roles;
    loadUsers();
  },
  { immediate: true, deep: true }
);
</script>
<route lang="yaml">
meta:
  layout: authorized
  middlewares: ["isAdmin"]
</route>
