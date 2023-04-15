import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useAuthStore } from "@/stores/useAuth.store";
import { getActivePinia } from "pinia";

export default (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Context => {
  const { notify } = useNotify();
  const context: Partial<Context> = {
    auth: { currentUser: {}, isAuth: false, token: "" },
    to,
    from,
    next,
    notify,
  };
  if (getActivePinia()) {
    const { currentUser, isAuth, token } = useAuthStore();
    context.auth = {
      isAuth,
      token,
      currentUser,
    };
  }

  return context as Context;
};
