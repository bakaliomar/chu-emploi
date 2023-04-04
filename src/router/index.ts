import { createRouter, createWebHistory } from "vue-router";
import pages from "virtual:generated-pages";
import { setupLayouts } from "virtual:generated-layouts";

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => {
    return { top: 0 };
  },
  routes: setupLayouts(pages),
});

export default router;
