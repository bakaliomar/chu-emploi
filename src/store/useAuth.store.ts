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

  const accessToken = useStorage<string>("access_token", "");

  const refreshToken = useStorage<string>("refresh_token", "");

  const isAuth = computed(() => !!accessToken.value);

  const currentUser = computed(() => new User(user.value.auth.user));

  const setAccessToken = (payload: string) => {
    accessToken.value = payload;
  };

  const setRefreshToken = (payload: string) => {
    refreshToken.value = payload;
  };

  const fetchUser = async () => {
    return axios("/users/me", { method: "GET" }).then(({ data }) => {
      user.value = {
        auth: {
          user: data,
          loggedIn: true,
        },
      };
    });
  };

  const logout = async () => {
    return axios.delete("/auth/logout").then(() => {
      accessToken.value = "";
      refreshToken.value = "";
      user.value = null;
    });
  };

  return {
    accessToken,
    refreshToken,
    isAuth,
    setAccessToken,
    setRefreshToken,
    fetchUser,
    logout,
    currentUser,
  };
});
