<template lang="pug">
.chu-table.pb-5(ref="root")
  .table-responsive(ref="table_responsive")
      table.table
        thead.head-row
          tr
            th.head(v-for="(head, index) in header" :class="`text-${head.align || 'start'}`" :key="index")
              .d-flex.align-items-center.flex-nowrap.text-nowrap(:class="`justify-content-${head.align}`")
                span {{ head.value }}
            th.text-center(v-if="!hideOptions")
        tbody
          tr(v-if="$slots.loading")
            td(:colspan="header.length + 2")
              slot(name="loading")
          tr(v-for="(row, index) in data" :key="`row-${index}`" v-else-if="hasData")
            td(v-for="(col, i) in header" :key="`head-${i}`" :style="col.style" :class="colClass")
              slot( :name="`${col.key}`" :row="row" :col="getValue(row, col.key)" :index="index" v-if="$slots[col.key]")
              div(v-else :class="`text-${col.align || 'start'}`") {{ getValue(row, col.key) }}
            td(style="width: 48px" v-if="!hideOptions" @click="overflow" v-on-clickaway="hideOverflow")
              slot(name="options" :row="row" :index="index")
          tr(v-else)
            td(:colspan="header.length + 2")
              slot(name="not_found")
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { get } from "lodash";
import { directive as vOnClickaway } from "vue3-click-away";
import { templateRef, useDebounceFn } from "@vueuse/core";
import type { PropType } from "vue";
import { isEqual } from "lodash";
import { isEmpty } from "lodash";

const table_responsive = templateRef<HTMLDivElement>("table_responsive");
const root = templateRef<HTMLDivElement>("root");

const props = defineProps({
  header: { type: Array as PropType<Header[]>, required: true },
  data: { type: Array, required: true },
  hideOptions: Boolean,
  colClass: { type: String, default: "" },
});

const hasData = computed(() => !!props.data.length);

const getValue = (
  option: Record<string, string>,
  key: string
): Record<string, string> | string => {
  return get(option, key);
};

const column_size = ref("200px");

onMounted(() => {
  const size = root.value?.getBoundingClientRect().width / props.header.length;
  column_size.value = `${size < 150 ? 150 : size}px`;
});

const hideOverflow = useDebounceFn(() => {
  if (root.value && !root.value?.querySelector(".more-options-menu")) {
    table_responsive.value.classList.remove("overflow-inherit");
  }
}, 50);

const overflow = (): void => {
  if (
    table_responsive.value &&
    !table_responsive.value.classList.contains("overflow-inherit")
  ) {
    table_responsive.value?.classList.add("overflow-inherit");
  } else if (!root.value?.querySelector(".more-options-menu")) {
    table_responsive.value.classList.remove("overflow-inherit");
  }
};
</script>
<style lang="scss">
@import "bootstrap/scss/tables";

.chu-table {
  --max-column-width: v-bind(column_size);
  .actions {
    background-color: var(--primary);
    height: 40px;
  }

  &.with-border {
    .table-responsive {
      border: 1px solid #e2e2ec;
    }
  }

  table {
    border-collapse: collapse;
  }

  .table-responsive {
    border-radius: 20px;
  }

  .overflow-inherit {
    overflow: inherit;
  }

  .more-options-menu {
    right: 37px !important;
  }

  &.bordered {
    th {
      border-bottom: 2px solid #e5e5e5;
    }

    td {
      border-bottom: 1px solid #e5e5e5;
    }
  }

  tr {
    box-shadow: inset 0 0 0 9999px white;
  }

  td,
  th {
    //max-width: var(--max-column-width);
    vertical-align: middle !important;
    padding: 0.75rem;
    box-shadow: inset 0 0 0 9999px $blue-light-3;
  }

  .head {
    color: var(--text-primary);
    font-size: 12px;
    letter-spacing: 0;
    line-height: 20px;
  }

  .head-row {
    background-color: $blue-light-3 !important;
    box-shadow: inset 0 0 0 9999px $blue-light-3;

    th,
    td {
      background-color: $blue-light-3 !important;
      box-shadow: inset 0 0 0 9999px $blue-light-3;
    }
  }

  tbody {
    border: 0;
  }

  // the following styles allow you to use .table-striped without tbody
  &.table-striped {
    tr:nth-child(odd) {
      background-color: #f8f9fb;
      box-shadow: inset 0 0 0 9999px white;

      td {
        background-color: #f8f9fb;
        box-shadow: inset 0 0 0 9999px white;
        border: 0;
      }
    }
  }
}
</style>
