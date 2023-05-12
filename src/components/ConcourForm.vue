<template lang="pug">
.concours-new.container
  .d-flex
  h1.primary-title Formulaire de concour
  form(@submit.prevent="onSubmit")
    .row.mt-5
      .form-group.col-12
        label.required Nom du poste
        input.form-control.shadow.bg-body.rounded(type='text' v-model="name")
        small.error {{ errors.name }}
      .form-group.col-12.mt-3
        label Lieu du poste
        input.form-control.shadow.bg-body.rounded(type='text' v-model="location")
        small.error {{ errors.location }}
    .row.mt-5
      .form-group.col-12.mt-3
        label Description
        textarea.form-control.shadow.bg-body.rounded(type='text' v-model="description")
        small.error {{ errors.description }}
    .row.mt-3
      .form-group.col-12.col-md-6
        label.required Date de clôture
        Datepicker.shadow.bg-body(v-model="closingDate")
        small.error {{ errors.closingDate }}
      .form-group.col-12.col-md-6
        label.required Date de concour
        Datepicker.shadow.bg-body(v-model="concourDate")
        small.error {{ errors.concourDate }}
    .row.mt-3.justify-content-center
      .form-group.col-12.col-md-6
        label.required Postes Nombre
        input.form-control.shadow.bg-body.rounded(type='number' v-model="positionsNumber")
        small.error {{ errors.location }}
      .col-12.col-md-6.d-flex.align-items-center
        .form-group
          input.form-check-input.checkk(type='checkbox' v-model="closed")
          span.ms-2.form-check-label.text-wrap.fw-bold clôture
    .specialities-container.mt-3.row
      .specialities.d-flex.flex-row-reverse.flex-wrap
        .speciality.py-2.px-1.ms-2.d-inline-flex.align-items-center.flex-nowrap.mt-1(v-for="speciality in selectedSpecialities" :key="speciality.id")
          span.me-2.error.fw-bold.cursor-pointer(@click="unselectCategories(speciality.id)") X
          .speciality-value {{speciality.name}}
      .col-12.mt-2
        label.required Sp&eacute;ialit&eacute;
        br
        select.form-select.mt-2.shadow.bg-body.rounded(@click="selectCategories($event.target.value)")
          option(:disabled="true" :selected="true") Choisis une speciality
          option(v-for="item in loadedSpecialities" :key="item.id" :value="item.id") {{ item.name }}
        small.error {{ errors.specialities }}
    .row.mt-3 
      .form-group.col-12
        label(:class="{'required': isNew}") Anounce
        input.form-control.shadow.bg-body.rounded(type='file' ref="uploader")
        span(v-if="!fileError") Types de fichiers accept&eacute;s : pdf, Taille max. des fichiers : 5 MB
        small.error(v-else) {{ fileError }}
    .d-flex.justify-content-center.mt-4
      button.submit-btn.rounded-pill.px-5.py-1(type='submit') Submit
  </template>
<script lang="ts" setup>
import { onBeforeMount, ref, computed } from "vue";
import { useField, useForm } from "vee-validate";
import { useRoute, useRouter } from "vue-router";
import * as yup from "yup";
import { isEmpty } from "lodash";
import { useNotification } from "@kyvg/vue3-notification";
import { serialize } from "object-to-formdata";
import Datepicker from "@vuepic/vue-datepicker";
import useAxios from "@/composables/useAxios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps({
  concour: {
    type: Object,
    default: () => ({
      closed: false,
    }),
  },
});

const { axios } = useAxios();
const route = useRoute();
const router = useRouter();

const { handleSubmit, errors } = useForm({
  validationSchema: yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    location: yup.string(),
    closingDate: yup.date().required(),
    concourDate: yup.date().required(),
    positionsNumber: yup.number().required(),
    closed: yup.boolean().required(),
    specialities: yup.array().min(1),
  }),
});

const { value: name } = useField("name", undefined, {
  initialValue: props.concour.name || "",
});
const { value: description } = useField("description", undefined, {
  initialValue: props.concour.description || "",
});
const { value: location } = useField("location", undefined, {
  initialValue: props.concour.location || "",
});
const { value: closingDate } = useField("closingDate", undefined, {
  initialValue: props.concour.closingDate || "",
});
const { value: concourDate } = useField("concourDate", undefined, {
  initialValue: props.concour.concourDate || "",
});
const { value: positionsNumber } = useField("positionsNumber", undefined, {
  initialValue: props.concour.positionsNumber || 0,
});
const { value: closed } = useField("closed", undefined, {
  initialValue: props.concour.closed || false,
});
const { value: specialities } = useField<string[]>("specialities", undefined, {
  initialValue: [],
});
const loadedSpecialities = ref<{ name: string; id: string }[]>([]);
const selectedSpecialities = ref<{ name: string; id: string }[]>([]);
const uploader = ref<HTMLInputElement | null>();
const file = ref<File | null>(null);
const { notify } = useNotification();
const fileError = ref("");

const isNew = computed(() => {
  return isEmpty(route.params.id);
});

function loadSpecialities(): Promise<void> {
  return axios.get("/specialities/autocomplete").then(({ data }) => {
    loadedSpecialities.value = data;
  });
}

function selectCategories(id: string) {
  if (!isEmpty(id)) {
    selectedSpecialities.value = [
      ...selectedSpecialities.value,
      ...loadedSpecialities.value.splice(
        loadedSpecialities.value.findIndex((i) => {
          return i.id === id;
        }),
        1
      ),
    ];
    specialities.value.push(id);
  }
}

function unselectCategories(id: string) {
  if (!isEmpty(id)) {
    loadedSpecialities.value = [
      ...loadedSpecialities.value,
      ...selectedSpecialities.value.splice(
        selectedSpecialities.value.findIndex((i) => {
          return i.id === id;
        }),
        1
      ),
    ];
    specialities.value.splice(specialities.value.indexOf(id), 1);
  }
}

onBeforeMount(async () => {
  await loadSpecialities();
  props.concour.concourSpeciality.forEach(
    (item: { speciality: { id: string } }) =>
      selectCategories(item.speciality.id)
  );
});

function addConcour() {
  if (!uploader.value?.files?.length && !file.value) {
    fileError.value = "file is a required field";
    return;
  }
  if (uploader.value?.files?.length) file.value = uploader.value.files[0];
  fileError.value = "";
  const formData = serialize({
    name: name.value,
    description: description.value,
    file: file.value,
    location: location.value || "",
    closingDate: closingDate.value,
    concourDate: concourDate.value,
    positionsNumber: positionsNumber.value,
    closed: closed.value,
    specialities: specialities.value,
  });
  axios
    .post("concours", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => {
      notify({
        type: "success",
        title: "Concour ajouter avec successe",
      });
      router.push("/admin/concours");
    });
}

function editConcour() {
  let headers = {};
  if (uploader.value?.files?.length) {
    file.value = uploader.value.files[0];
    headers = {
      "Content-Type": "multipart/form-data",
    };
  }
  const formData = serialize({
    name: name.value,
    description: description.value,
    file: file.value,
    location: location.value || "",
    closingDate: closingDate.value,
    concourDate: concourDate.value,
    positionsNumber: positionsNumber.value,
    closed: closed.value,
    specialities: specialities.value,
  });
  axios
    .patch(`/concours/${route.params.id}`, formData, {
      headers,
    })
    .then(() => {
      notify({
        type: "success",
        title: "Concour edite avec successe",
      });
      router.push("/admin/concours");
    });
}

const onSubmit = handleSubmit(() => {
  isNew.value ? addConcour() : editConcour();
});
</script>
