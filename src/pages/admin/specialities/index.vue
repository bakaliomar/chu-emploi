<template lang="pug">
.specialities-index.container
  ConfirmModal(ref="confirm_modal")
  .d-flex.justify-content-between.align-items-center
    h1.primary-title Specialities List
    .ajouter-btn + Ajouter 
  Table.bordered.mt-3(:header="header" :data="specialities")
    template(v-slot:loading v-if="loading")
      Loader
    template(v-slot:options="{ row }")
      Options.justify-content-end
        .menu-item Editer
        .menu-item.text-start.text-danger(@click="deleteSpeciality(row.id)") Suprimer
    template(#not_found)
      Notfound(entity="Specilaities")
</template>
<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import useAxios from "@/composables/useAxios";
import Table from "@/components/Table.vue";
import Loader from "@/components/Loader.vue";
import Options from "@/components/Options.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
import { useNotification } from "@kyvg/vue3-notification";
import Notfound from "@/components/Notfound.vue";

const { axios } = useAxios();
const specialities = ref<{ name: string; id: string }[]>([]);
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
const { notify } = useNotification();

const header: Header[] = [
  {
    key: "name",
    value: "Speciality Name",
  },
];

function loadSpecialities() {
  loading.value = true;
  axios
    .get("/specialities")
    .then(({ data }) => {
      specialities.value = data.data;
      pagination.value = data.meta;
    })
    .finally(() => {
      loading.value = false;
    });
}

const deleteSpeciality = async (id: string) => {
  const ok = await confirm_modal.value?.show({
    title: "Suprimer une Speciality",
    message: "êtes-vous sûr de vouloir supprimer ce speciality",
  });

  if (ok) {
    axios.delete(`/specialities/${id}`).then(() => {
      notify({
        title: "Speciality supprimé avec succès",
        type: "success",
      });
      loadSpecialities();
    });
  }
};

onBeforeMount(() => {
  loadSpecialities();
});
</script>
<route lang="yaml">
meta:
  layout: authorized
  middlewares: ["isAdmin", "isManager"]
</route>
