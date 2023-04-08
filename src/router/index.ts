import { createRouter, createWebHistory } from "vue-router";
import pages from "virtual:generated-pages";
import { setupLayouts } from "virtual:generated-layouts";
import { getActivePinia } from "pinia";

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => {
    return { top: 0 };
  },
  routes: setupLayouts(pages),
});

router.beforeEach(async (to, from, next) => {
  await getActivePinia();
  next();
});

export default router;
