import auth from "@/auth/auth";
import guest from "@/auth/guest";
import { useAuthStore } from "@/store/useAuth.store";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import context from "@/utils/context";
import { getActivePinia } from "pinia";

export default async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const ctx = context(to, from, next);
  const authType = ctx.to.meta.auth;
  if (getActivePinia()) {
    const { isAuth, accessToken, currentUser } = useAuthStore();
    ctx.auth = {
      isAuth,
      accessToken,
      currentUser,
    };
  }
  let pass = true;
  switch (authType) {
    case "guest":
      pass = guest(ctx);
      break;
    case false:
      break;
    default:
      pass = auth(ctx);
  }
  if (pass)
    for (const middle of (ctx.to.meta.middlewares as string[]) || []) {
      const exec = await import(
        /* @vite-ignore */ `../middleware/${middle}.ts`
      );
      pass = await exec.default(ctx);
      if (!pass) break;
    }
  pass && ctx.next();
};
