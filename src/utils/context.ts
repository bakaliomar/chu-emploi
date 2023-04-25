import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useAuthStore } from "@/store/useAuth.store";
import { getActivePinia } from "pinia";
import { useNotification } from "@kyvg/vue3-notification";

export default (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Context => {
  const { notify } = useNotification();
  const context: Partial<Context> = {
    auth: { currentUser: {}, isAuth: false, accessToken: "" },
    to,
    from,
    next,
    notify,
  };
  if (getActivePinia()) {
    const { currentUser, isAuth, accessToken } = useAuthStore();
    context.auth = {
      isAuth,
      accessToken,
      currentUser,
    };
  }

  return context as Context;
};
