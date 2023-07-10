<template lang="pug">
.candidature-show.container(v-if="!loading")
  ConfirmModal(ref="confirm_modal")
  Modal.state-modal.show-close-icon(v-if="isOpen" @close="isOpen = false")
    h2.title Changer L'etat
    .row.mt-3
      .col-12.mt-2(:class="{'col-md-5': isRefused}")
        .form-check.d-flex.align-items-baseline
          input.form-check-input(type='radio' value="UNTREATED" v-model="state")
          label.form-check-label.ms-2 Non traité
        .form-check.d-flex.align-items-baseline
          input.form-check-input(type='radio' value="SHORTLISTED" v-model="state")
          label.form-check-label.ms-2 Présélectionné
        .form-check.d-flex.align-items-baseline
          input.form-check-input(type='radio' value="REFUSED" v-model="state")
          label.form-check-label.ms-2 Refusé
        .form-check.d-flex.align-items-baseline
          input.form-check-input(type='radio' value="ADMITTED" v-model="state")
          label.form-check-label.ms-2 Admis définitivement
      .col-12.col-md-7(v-if="isRefused")
        .form-check.d-flex.align-items-baseline
          input.form-check-input(type='radio' value="Diplôme non conforme" v-model="motive")
          label.form-check-label.ms-2 Diplôme non conforme
        .form-check.d-flex.align-items-baseline
          input.form-check-input(type='radio' value="Manque des pièces" v-model="motive")
          label.form-check-label.ms-2 Manque des pièces
        .form-check.d-flex.align-items-baseline
          input.form-check-input(type='radio' value="Age" v-model="motive")
          label.form-check-label.ms-2 Age
        .form-check.d-flex.align-items-baseline
          input.form-check-input(type='radio' value="Autre" @change="writeMotive" v-model="motive")
          label.form-check-label.ms-2 Autre
        .form-group(v-if="isOther")
          label.required Motive
          textarea.form-control.shadow.bg-body.rounded(rows='3' v-model="motiveMsg")
          small.error {{ motiveError }}
    .d-flex.justify-content-between.mt-4
      button.confirm-btn.outline-primary.mxw-130(@click="isOpen = false") Cancel
      button.confirm.confirm-btn.primary.mxw-130(@click="save" type="button") Save
  .custom-card
    .d-flex.justify-content-between.align-items-center
      .primary-title Candidature
      .badge.rounded-pill.px-2.py-1(:class="candiadautre.state") {{ getState(candiadautre.state) }}
    CandidatureShow.mt-3(:candidature="candiadautre" v-if="candiadautre")
    .pair-title-value
      .pair-title Motive:
      .pair-value {{ candiadautre.motive || ""}}
    .d-flex.justify-content-between.mt-3
      button.btn.btn-delete.rounded-pill.px-5.py-2(@click="deleteCandidature") Suprimer
      button.btn.btn-suivant.rounded-pill.px-5.py-2(@click="toggleState") Changer l'etat
</template>
<script lang="ts" setup>
import { ref, computed, onBeforeMount } from "vue";
import useAxios from "@/composables/useAxios";
import { useRoute, useRouter } from "vue-router";
import CandidatureShow from "@/components/CandidatureShow.vue";
import Modal from "@/components/Modal.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
import { useNotification } from "@kyvg/vue3-notification";

const { axios } = useAxios();
const route = useRoute();
const router = useRouter();
const candiadautre = ref<CandidatureShow | null>(null);
const isOpen = ref(false);
const confirm_modal = ref<typeof ConfirmModal | null>(null);
const { notify } = useNotification();
const loading = ref(true);
const motive = ref("Reconnaissance de diplôme");
const motiveError = ref("");
const motiveMsg = ref("");

const state = ref(candiadautre.value?.state || "");

const isRefused = computed(() => {
  return state.value === "REFUSED";
});

const isOther = computed(() => {
  return motive.value === "Autre";
});

function save() {
  if (isRefused.value && !motive.value) {
    motiveError.value = "Motive is a Required Field";
    return;
  }
  motiveError.value = "";
  axios
    .patch(`candidatures/${route.params.id}/toggle`, {
      state: state.value,
      ...(isRefused.value
        ? {
            motive: isOther.value ? motiveMsg.value : motive.value || undefined,
          }
        : {}),
    })
    .then(() => {
      notify({
        title: "state updated successfully",
        type: "success",
      });
      isOpen.value = false;
      loadCandidature();
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

function toggleState() {
  state.value = candiadautre.value!.state!;
  isOpen.value = true;
}

const deleteCandidature = async () => {
  const ok = await confirm_modal.value?.show({
    title: "Suprimer une Candidature",
    message: "êtes-vous sûr de vouloir supprimer ce candidature",
  });

  if (ok) {
    axios.delete(`/candidatures/${route.params.id}`).then(() => {
      notify({
        title: "Concour supprimé avec succès",
        type: "success",
      });
      router.push({ name: "admin_candidatures" });
    });
  }
};

function loadCandidature() {
  loading.value = true;
  axios.get(`/candidatures/${route.params.id}`).then(({ data }) => {
    candiadautre.value = data;
    loading.value = false;
  });
}

onBeforeMount(() => {
  loadCandidature();
});
</script>
<style lang="scss">
.candidature-show {
  .btn {
    font-style: normal;
    font-size: 22px;
    color: #ffffff;
    cursor: pointer;
    border: 0;
  }
  .btn-suivant {
    background: #10529e;
    opacity: 0.96;
  }
  .btn-delete {
    background: $error-color;
    opacity: 0.96;
  }
}
</style>
<route lang="yaml">
meta:
  layout: authorized
  middlewares: ["isAdmin", "isManager"]
</route>
