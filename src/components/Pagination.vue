<template lang="pug">
ul.pagination.custom-pagination(v-if="paginate && paginate.lastPage > 1")
  li.prev( :class="[firstPageSelected ? 'disabled' : '']")
    a.page-link( @click="prevPage()" @keyup.enter="prevPage()" :to="{ path: $route.path, query: { ...$route.query, page: selected - 1 } }" target="_self")
    svg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512")
      path(d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z")
  li.page-item(v-for="page in pages" :class="[page.selected ? 'active' : '', (page.disabled as boolean) ? 'disabled' : '']")
    a.page-link(v-if="page.disabled" :to="{ path: $route.path, query: { ...$route.query, page: page.content } }" target="_self" ) {{ page.content }}
    a.page-link(  @click="handlePageSelected(page.index + 1)" @keyup.enter="handlePageSelected(page.index + 1)" :to="{ path: $route.path, query: { ...$route.query, page: page.content } }" target="_self" v-else) {{ page.content }}
  li.next(:class="[lastPageSelected ? 'disabled' : '']")
    a.page-link(@click="nextPage()" @keyup.enter="nextPage()" :to="{ path: $route.path, query: { ...$route.query, page: selected + 1 } }" target="_self")
    svg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512")
      path(d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z")
  </template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import type { PropType } from "vue";

const props = defineProps({
  paginate: { type: Object as PropType<Paginate>, required: true },
});
const emit = defineEmits<{
  (e: "page-changed", page: number): void;
  (e: "update:paginate", paginate: Paginate): void;
}>();

const innerValue = ref(1);

const selected = computed((): number => {
  return props.paginate?.currentPage || innerValue.value;
});

const firstPageSelected = computed((): boolean => {
  return selected.value === 1;
});

const lastPageSelected = computed((): boolean => {
  return (
    selected.value === props.paginate.lastPage || props.paginate.lastPage === 0
  );
});

const pages = computed((): Record<number, unknown> => {
  const items: Record<number, unknown> = {};

  function setPageItem(index: number): void {
    items[index] = {
      index,
      content: index + 1,
      selected: index === selected.value - 1,
    };
  }

  if (props.paginate.lastPage <= 4) {
    for (let index = 0; index < props.paginate.lastPage; index += 1) {
      setPageItem(index);
    }
  } else {
    const halfPageRange = 2;

    // 2nd - loop through selected range
    let selectedRangeLow = 0;
    if (selected.value - halfPageRange > 0) {
      selectedRangeLow = selected.value - 1 - halfPageRange;
    }

    let selectedRangeHigh = selectedRangeLow + 5 - 1;
    if (selectedRangeHigh >= props.paginate.lastPage) {
      selectedRangeHigh = props.paginate.lastPage - 1;
      selectedRangeLow = selectedRangeHigh - 5 + 1;
    }

    for (
      let i = selectedRangeLow;
      i <= selectedRangeHigh && i <= props.paginate.lastPage - 1;
      i += 1
    ) {
      setPageItem(i);
    }
  }
  return items;
});

const selectPage = (page: number): void => {
  emit("page-changed", page);
  emit("update:paginate", { ...props.paginate, currentPage: page });
};

const handlePageSelected = (select: number): void => {
  if (selected.value === select) {
    return;
  }
  innerValue.value = select;
  selectPage(select);
};

const prevPage = (): void => {
  if (selected.value <= 1) {
    return;
  }

  handlePageSelected(selected.value - 1);
};

const nextPage = (): void => {
  if (selected.value >= props.paginate.lastPage) {
    return;
  }
  handlePageSelected(selected.value + 1);
};
</script>

<style lang="scss">
@import "bootstrap/scss/pagination";

nav.pagination-container {
  text-align: center;
}

ul.pagination.custom-pagination {
  display: inline-flex;

  > li {
    margin-left: 3px;
    margin-right: 3px;
    font-size: smaller;
    width: fit-content;
    height: 32px;

    a {
      cursor: pointer;
      min-width: 32px;
      background: #fff;
      border: 1px solid var(--primary);
      border-radius: 12px;
      box-sizing: border-box;
      margin: 0;
      font-weight: bold;
      width: fit-content;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: $font-family-base;
      font-size: 14px;
      letter-spacing: 0;
      line-height: 20px;
      text-align: center;
      color: var(--primary);
    }

    &.active {
      a {
        z-index: unset;
        background-color: var(--primary);
        color: white;
        font-weight: bold;

        &:hover {
          color: #eee;
          background-color: var(--primary);
        }
      }
    }

    &.next,
    &.prev {
      margin-left: 7px;
      margin-right: 7px;

      a {
        font-weight: bold;
        border: 1px solid var(--primary);
        box-sizing: border-box;
      }
    }
  }

  .page-item {
    padding: 0;
  }
}
</style>
