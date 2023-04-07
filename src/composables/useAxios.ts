import { useAxios, UseAxiosOptions } from "@vueuse/integrations/useAxios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";
import { notify } from "@kyvg/vue3-notification";
import { useAuth } from "@/store/auth";

const auth = useAuth();

export class AxiosSingleton {
  private static instance: AxiosInstance;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): AxiosInstance {
    if (!AxiosSingleton.instance) {
      AxiosSingleton.instance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      AxiosSingleton.instance.interceptors.request.use((config) => {
        if (config.headers) {
          config.headers.Authorization = localStorage.access_token
            ? `${localStorage.access_token}`
            : false;
        }

        return config;
      });

      AxiosSingleton.instance.interceptors.response.use(
        (response) => {
          return response;
        },
        async (err) => {
          const errors = err.response?.data;
          if (errors?.errors)
            Object.values(errors.errors).forEach((key): void => {
              notify({
                title: `${key}`,
                type: "error",
              });
            });
          else if (errors?.error) {
            notify({
              title: errors.error,
              type: "error",
            });
          }

          if (err.response?.status === 401) {
            const { status, data } = await axios.get("/auth/refresh", {
              headers: {
                Authorization: auth.refresh_token,
              },
            });
            if (status === 200) {
              auth.setAccessToken(data.access_token);
              auth.setRefreshToken(data.refresh_token);
              const instance = this.getInstance();
              return instance(err.config);
            }
            localStorage.clear();
            window.location.reload();
          }

          return Promise.reject(err);
        }
      );
    }
    return AxiosSingleton.instance;
  }
}

export default (
  path?: string,
  config: Partial<AxiosRequestConfig> = {},
  options: UseAxiosOptions = { immediate: true }
) => {
  let axiosOption = useAxios(AxiosSingleton.getInstance());
  if (path)
    axiosOption = useAxios(path, config, AxiosSingleton.getInstance(), options);
  return {
    ...axiosOption,
    axios: AxiosSingleton.getInstance(),
  };
};
