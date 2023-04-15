import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { computed, ref } from "vue";
import useAxios from "@/composables/useAxios";
import User from "@/utils/User";

interface Auth {
  loggedIn: boolean;
  user?: CurrentUser;
}

export const useAuthStore = defineStore("auth", () => {
  const user = useStorage<{ auth: Auth }>("vuex", {
    auth: { loggedIn: false },
  });

  const { axios } = useAxios();

  const token = ref<string>("");

  const isAuth = computed(() => !!token.value);

  const currentUser = computed(() => new User(user.value.auth.user));

  const setToken = (payload: string) => {
    token.value = payload;
  };

  const fetchUser = async () => {
    return axios("/api/me", { method: "GET" }).then(({ data }) => {
      user.value = {
        auth: {
          user: data.user,
          loggedIn: true,
        },
      };
    });
  };

  const logout = async () => {
    return axios.delete("/api/logout").then(() => {
      token.value = "";
      user.value = null;
    });
  };

  return {
    token,
    isAuth,
    setToken,
    fetchUser,
    logout,
    currentUser,
  };
});
