import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { computed } from "vue";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  id: string;
}

export const useAuth = defineStore("auth", () => {
  const admin = useStorage<User | Record<string, string>>("user", {});
  const access_token = useStorage<string>("access_token", "");
  const refresh_token = useStorage<string>("refresh_token", "");

  const user = computed(() => admin.value);
  const isAuth = computed(() => !!access_token.value);
  const logout = () => {
    localStorage.clear();
  };
  const setUser = (user: Record<string, string>) => {
    admin.value = user;
  };
  const setAccessToken = async (payload: string) => {
    access_token.value = payload;
  };

  const setRefreshToken = async (payload: string) => {
    refresh_token.value = payload;
  };

  return {
    user,
    isAuth,
    access_token,
    refresh_token,
    logout,
    setUser,
    setAccessToken,
    setRefreshToken,
  };
});
