<template lang="pug">
VueAwesomePaginate(
    :total-items="paginate.total"
    :items-per-page="paginate.perPage"
    :max-pages-shown="5"
    :current-page="paginate.currentPage"
    :on-click="onClickHandler")
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

/* currentPage: number;
  lastPage: number;
  next: number | null;
  perPage: number;
  prev: number | null;
  total: number; */

const props = defineProps({
  paginate: {
    type: Object as PropType<Paginate>,
    required: true,
  },
});

const emit = defineEmits(["update:page"]);

function onClickHandler(page: number) {
  emit("update:page", page);
}
</script>
