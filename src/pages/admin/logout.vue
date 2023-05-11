<template lang="pug">

</template>
<script lang="ts" setup>
import { useAuthStore } from "@/store/useAuth.store";
import { onMounted } from "vue";

const { logout } = useAuthStore();

onMounted(async () => {
  await logout();

  window.location.href = "/";
});
</script>
<route lang="json">
{
  "meta": {
    "layout": "empty"
  }
}
</route>
