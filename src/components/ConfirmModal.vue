<template lang="pug">
Modal.confirm-modal.show-close-icon(v-if="open" @close="_cancel")
  h2.title {{ title }}
  p.text-center.mt-3(v-if="message") {{ message }}
  .d-flex.justify-content-between.mt-4
    button.confirm-btn.outline-primary.mxw-130(@click="_cancel") {{ cancelButton }}
    button.confirm.confirm-btn.primary.mxw-130(@click="_confirm") {{ okButton }}
  </template>

<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-empty-function */
import { ref } from "vue";
import Modal from "./Modal.vue";

export interface ConfirmOptions {
  title: string;
  message?: string;
  okButton?: string;
  cancelButton?: string;
}

let resolvePromise: (
  value: boolean | void | PromiseLike<boolean | void>
) => void = (_: boolean | void | PromiseLike<boolean | void>): void => {};
let rejectPromise: (value: boolean | PromiseLike<boolean>) => void = (
  _: boolean | PromiseLike<boolean>
): void => {};

const open = ref(false);
const title = ref("");
const message = ref("");
const okButton = ref("Confirm");
const cancelButton = ref("Cancel");

const show = (opts: ConfirmOptions): Promise<boolean> => {
  title.value = opts.title;
  message.value = opts.message || "";
  if (opts.okButton) {
    okButton.value = opts.okButton;
  }
  if (opts.cancelButton) {
    cancelButton.value = opts.cancelButton;
  }
  open.value = true;
  // Return promise so the caller can get results
  return new Promise((resolve, reject) => {
    resolvePromise = resolve as (
      value: boolean | void | PromiseLike<boolean | void>
    ) => void;
    rejectPromise = reject;
  });
};

const _confirm = (): void => {
  resolvePromise(true);
  open.value = false;
};
const _cancel = (): void => {
  resolvePromise(false);
  open.value = false;
};

defineExpose({
  show,
});
</script>

<style lang="scss">
.confirm-modal {
  .mxw-130 {
    min-width: 130px;
  }
}
</style>
