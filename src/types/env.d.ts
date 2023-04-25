/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare interface Concour {
  id: string;
  name: string;
  description: string;
  anounce: string;
  closingDate: string;
  concourDate: string;
  concourSpeciality: { speciality: { name: string; id: string } }[];
}

declare interface Header {
  key: string;
  value: string;
  style?: string;
  align?: string;
  sort?: boolean;
}

declare interface CurrentUser {
  first_name: string;
  last_name: string;
  email: string;
  id: string;
  roles: string;
  cin: string;
}

declare interface Context {
  from: import("vue-router").RouteLocationNormalized;
  to: import("vue-router").RouteLocationNormalized;
  next: import("vue-router").NavigationGuardNext;
  auth: {
    isAuth: boolean;
    accessToken: string;
    currentUser: Partial<import("@/utils/User").default>;
  };
  notify: (args: NotifyArgs) => void;
}

declare interface Paginate {
  currentPage: number;
  lastPage: number;
  next: number | null;
  perPage: number;
  prev: number | null;
  total: number;
}
