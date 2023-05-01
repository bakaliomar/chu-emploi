<template lang="pug">
ConcourForm(:concour="concour" v-if="!isEmpty(concour.id)")
</template>
<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import ConcourForm from "@/components/ConcourForm.vue";
import { useRoute } from "vue-router";
import useAxios from "@/composables/useAxios";
import { isEmpty } from "lodash";

const { axios } = useAxios();
const route = useRoute();

const concour = ref({});

onBeforeMount(() => {
  axios.get(`/concours/${route.params.id}`).then(({ data }) => {
    concour.value = data;
  });
});
</script>
<route lang="yaml">
meta:
  layout: authorized
  middlewares: ["isAdmin", "isManager"]
</route>
