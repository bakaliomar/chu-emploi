<template lang="pug">
transition(name='modal')
  .modal-mask(v-if="show" v-bind="$attrs")
    .modal-wrapper
      .modal-container(ref="modal")
        .modal-body.pt-5
          .modal-body__close-icon( @click="close") X
          slot
  </template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const emit = defineEmits(["close", "outside-click"]);
const show = ref(false);
const modal = ref();

onMounted(() => {
  show.value = true;
});

onClickOutside(modal, () => {
  emit("outside-click");
});

const close = (): void => {
  emit("close");
};
</script>

<style lang="scss">
.modal-container {
  --color-background: white;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  height: fit-content;
  border-radius: 20px;
  //overflow-y: scroll;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transform: scale(1.1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;

  .modal-body {
    background: $white;
    max-height: 100vh;
    overflow: inherit;
    overflow-y: auto;
    padding: 1rem;
    position: relative;
    border-radius: 20px;

    .title {
      color: $primary-color;
      font-size: 20px;
      font-weight: bold;
      line-height: 28px;
      text-align: center;
      margin-bottom: 32px;
      text-transform: capitalize;
    }

    label {
      font-size: 12px;
      font-weight: bold;
      letter-spacing: 0;
    }

    abbr {
      color: #f03d3d;
      text-decoration: none;
    }

    @at-root #{&}__close-icon {
      z-index: 1;
      position: absolute;
      height: 24px;
      width: 24px;
      top: 21px;
      right: 18px;
      background: #e5e5e5;
      border-radius: 50%;
      font-size: 16px;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      display: none;

      svg {
        font-size: 16px;
      }

      @at-root #{&}--default-hidden {
        display: none;
      }
    }
  }

  &.show-close-icon {
    .modal-body__close-icon {
      display: flex;
    }
  }

  &.big {
    .modal-container {
      max-width: 1140px;
    }
  }

  &.small {
    .modal-container {
      max-width: 550px;
    }
  }

  &.out-box {
    .modal-body {
      overflow-y: inherit !important;
    }
  }

  &.padding-less {
    .modal-body {
      padding: 0 !important;
    }
  }

  &.fit-content {
    .modal-body,
    .modal-container {
      width: fit-content;
    }

    .modal-body {
      padding: 0 !important;
    }
  }
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>
