<template lang="pug">
.specialities-index.container
  ConfirmModal(ref="confirm_modal")
  Modal.state-modal.show-close-icon(v-if="isOpen" @close="isOpen = false")
    h2.title Ajouter Noveau Specilaity
    form.row.mt-3(@submit.prevent="onSubmit")
      .form-group.col-12
        label.required Nom du speciality
        input.form-control.shadow.bg-body.rounded(type='text' v-model="name")
        small.error {{ errors.name }}
      .form-group.col-12.mt-3
        label.text-end.arbic-required.d-block اسم التخصص
        input.form-control.shadow.bg-body.rounded(type='text' v-model="nameArabic")
        small.error {{ errors.nameArabic }}
      .d-flex.justify-content-between.mt-4
        button.confirm-btn.outline-primary.mxw-130(type="button" @click="isOpen = false") Cancel
        button.confirm.confirm-btn.primary.mxw-130(type="submit") Save
  .d-flex.justify-content-between.align-items-center
    h1.primary-title Specialities List
    .ajouter-btn(@click="startAdd") + Ajouter 
  Table.bordered.mt-3(:header="header" :data="specialities")
    template(v-slot:loading v-if="loading")
      Loader
    template(v-slot:options="{ row }")
      Options.justify-content-end
        .menu-item(@click="startEdit(row)") Editer
        .menu-item.text-start.text-danger(@click="deleteSpeciality(row.id)") Suprimer
    template(#not_found)
      Notfound(entity="Specilaities")
  Paginate(:paginate="pagination" @page-changed="pageChanged" )
</template>
<script lang="ts" setup>
import { ref, onBeforeMount, computed } from "vue";
import useAxios from "@/composables/useAxios";
import Table from "@/components/Table.vue";
import Loader from "@/components/Loader.vue";
import Options from "@/components/Options.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
import { useNotification } from "@kyvg/vue3-notification";
import Notfound from "@/components/Notfound.vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { isEmpty } from "lodash";
import Modal from "@/components/Modal.vue";
import Paginate from "@/components/Pagination.vue";

interface Speciality {
  name: string;
  nameArabic: string;
  id: string;
}

const { axios } = useAxios();
const specialities = ref<Speciality[]>([]);
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
const isOpen = ref(false);

const header: Header[] = [
  {
    key: "name",
    value: "Speciality Name",
  },
  {
    key: "nameArabic",
    value: "Speciality Name en Arabe",
  },
];

const isNew = computed(() => {
  return isEmpty(selectedId.value);
});

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: yup.object({
    name: yup.string().required(),
    nameArabic: yup.string().required(),
  }),
});

const { value: name } = useField("name");
const { value: nameArabic } = useField("nameArabic");
const selectedId = ref("");

function pageChanged(page: number) {
  pagination.value.currentPage = page;
}

function startAdd() {
  selectedId.value = "";
  resetForm();
  isOpen.value = true;
}

function startEdit(speciality: Speciality) {
  name.value = speciality.name;
  nameArabic.value = speciality.nameArabic;
  selectedId.value = speciality.id;
  isOpen.value = true;
}

function addSpeciality(data: FormData) {
  axios
    .post("/specialities", {
      name: name.value,
      nameArabic: nameArabic.value,
    })
    .then(() => {
      notify({
        title: "speciality ajouter avec succee",
        type: "success",
      });
      isOpen.value = false;
      loadSpecialities();
    });
}

function editSpeciality(data: FormData) {
  axios
    .patch(`/specialities/${selectedId.value}`, {
      name: name.value,
      nameArabic: nameArabic.value,
    })
    .then(() => {
      notify({
        title: "speciality editer avec succee",
        type: "success",
      });
      isOpen.value = false;
      loadSpecialities();
    });
}

const onSubmit = handleSubmit(() => {
  const formData = new FormData();
  formData.append("name", name.value as string);
  formData.append("nameArabic", nameArabic.value as string);
  isNew.value ? addSpeciality(formData) : editSpeciality(formData);
});

function loadSpecialities() {
  loading.value = true;
  axios
    .get("/specialities", {
      params: {
        page: pagination.value.currentPage || 1,
        perPage: 10,
      },
    })
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
