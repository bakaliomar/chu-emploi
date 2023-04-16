import { createRouter, createWebHistory } from "vue-router";
import pages from "virtual:generated-pages";
import { setupLayouts } from "virtual:generated-layouts";
import { getActivePinia } from "pinia";
import { useAuthStore } from "@/store/useAuth.store";
import Middleware from "@/middleware";

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => {
    return { top: 0 };
  },
  routes: setupLayouts(pages),
});

router.beforeEach(async (to, from, next) => {
  await Middleware(to, from, next);
});

router.beforeEach(async (to, from) => {
  if (
    getActivePinia() &&
    !["login", "logout", "index", "candidature"].includes(
      to.name?.toString() || ""
    )
  ) {
    const { fetchUser, currentUser } = useAuthStore();
    if (!currentUser.id) {
      await fetchUser();
    }
  }
});

export default router;
