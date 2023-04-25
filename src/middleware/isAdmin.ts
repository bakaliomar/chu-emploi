import { useNotification } from "@kyvg/vue3-notification";

export default ({ next, auth }: Context) => {
  const { notify } = useNotification();
  if (!auth?.currentUser.isAdmin) {
    notify({
      type: "unknown",
      title: "You are not eligible to see this content",
    });
    next("/");
    return false;
  }
  return true;
};
