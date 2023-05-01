<template lang="pug">
.switcher.rounded-pill.d-flex.align-items-center(:class="[ modelValue ? 'flex-row-reverse bg-green': 'flex-row white border']" @click="clicked")
  .sw.rounded-circle.bg-white
  </template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["input", "click", "update:modelValue"]);

const clicked = () => {
  emit("input", !props.modelValue);
  emit("update:modelValue", !props.modelValue);
  emit("click");
};
</script>

<style lang="scss">
.switcher {
  height: 20px;
  width: 40px;
  padding: 0 3px;
  transition: 0.3s;

  &.bg-green {
    background-color: #b2ec92;
  }

  &:hover {
    cursor: pointer;
  }

  &.white {
    background-color: #c9ced6;
  }

  .sw {
    height: 12px;
    width: 12px;
  }
}
</style>
