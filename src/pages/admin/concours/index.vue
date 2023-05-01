<template lang="pug">
.concours-index.container
  ConfirmModal(ref="confirm_modal")
  PDFViewerModal(:source="source" v-if="showPdf" @close="showPdf = false")
  .d-flex.justify-content-between.align-items-center
    h1.title Concours
    .ajouter-btn
      RouterLink(:to="{name: 'admin_concours_new'}") + Ajouter 
  Table.bordered.mt-3(:header="header" :data="concours")
    template(v-slot:loading v-if="loading")
      Loader
    template(v-slot:location="{ col }")
      .concours-item {{ col ? col : "N/A" }}
    template(v-slot:closingDate="{ col }")
      .concours-item {{ dateFormat(col) }}
    template(v-slot:concourDate="{ col }")
      .concours-item {{ dateFormat(col) }}
    template(v-slot:closed="{ col }")
      .concours-item.text-center
        svg.check(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" v-if="col")
          path(d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z")
        svg.xmark(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" v-else)
          path(d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z")
    template(v-slot:anounce="{ col, row }")
      .concours-item.anounce-link(@click="openAnounce(row.id)") {{ startCase(col.split(".")[0]) }}
    template(v-slot:options="{ row }")
      Options.justify-content-end
        .menu-item
          RouterLink.d-flex.w-100.h-100(:to="{name: 'admin_concours_id', params: { id: row.id }}") Editer
        .menu-item.text-start.text-danger(@click="deleteConcour(row.id)") Suprimer
    template(#not_found)
      Notfound(entity="Candidature")
          


</template>
<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import format from "date-fns/formatISO9075";
import useAxios from "@/composables/useAxios";
import Table from "@/components/Table.vue";
import Loader from "@/components/Loader.vue";
import Options from "@/components/Options.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
import { useNotification } from "@kyvg/vue3-notification";
import PDFViewerModal from "@/components/PDFViewerModal.vue";
import { startCase } from "lodash";
import Notfound from "@/components/Notfound.vue";

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
const confirm_modal = ref<typeof ConfirmModal | null>(null);
const { notify } = useNotification();
const source = ref("");
const showPdf = ref(false);

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
    value: "Date de concour",
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

const deleteConcour = async (id: string) => {
  const ok = await confirm_modal.value?.show({
    title: "Suprimer une Concour",
    message: "êtes-vous sûr de vouloir supprimer ce concour",
  });

  if (ok) {
    axios.delete(`/concours/${id}`).then(() => {
      notify({
        title: "Concour supprimé avec succès",
        type: "success",
      });
      loadConcours();
    });
  }
};

function openAnounce(id: string) {
  axios
    .get(`/concours/${id}/anounce`, {
      headers: {
        responseType: "blob",
      },
    })
    .then(({ data }) => {
      source.value = window.URL.createObjectURL(new Blob([data as string]));
      showPdf.value = true;
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

  .anounce-link {
    text-decoration: none;
    color: $primary-color;
    size: 18px;
    font-weight: 400;
    line-height: 36px;
    cursor: pointer;
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
