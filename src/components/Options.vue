<template lang="pug">
.more-options
  svg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" @click="toggleShowMoreOptions")
    path(d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z")
  .more-options-menu(v-if="showMoreOptions" v-on-clickaway="toggleShowMoreOptions")
    slot
</template>
<script lang="ts" setup>
import { directive as vOnClickaway } from "vue3-click-away";
import { ref } from "vue";

const showMoreOptions = ref(false);

const toggleShowMoreOptions = (): void => {
  showMoreOptions.value = !showMoreOptions.value;
};
</script>
<style lang="scss">
.more-options {
  position: relative;
  display: flex;

  svg {
    width: 32px;
    height: 32px;
    font-weight: 400;
    cursor: pointer;
  }

  .more-options-button {
    width: 24px;
    cursor: pointer;
  }

  &.small {
    .more-options-button {
      width: 10px;
      height: 10px;
    }
  }

  .more-options-menu {
    position: absolute;
    z-index: 2;
    top: 30px;
    right: 5px;
    min-width: 150px;
    max-height: 200px;
    overflow-y: auto;
    width: fit-content;
    padding: 8px 0 4px 0;
    background-color: #fff;
    box-shadow: 0 0 1px 0 rgba(10, 31, 68, 0.08),
      0 8px 10px 0 rgba(10, 31, 68, 0.1);

    .menu-item {
      cursor: pointer;
      white-space: nowrap;
      color: #0a1f44;
      padding: 0 16px 0 20px;
      margin-bottom: 5px;
      font-size: 14px;
      line-height: 32px;
      text-align: left;

      a {
        text-decoration: none;
        color: inherit;
      }

      &:hover {
        background-color: #e2e2e2;
      }
    }
  }

  @media only screen and (max-height: 800px) {
    .more-options-menu {
      max-height: 120px;
    }
  }
}
</style>
