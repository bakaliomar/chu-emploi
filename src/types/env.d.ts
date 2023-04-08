/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

export interface Concour {
  id: string;
  name: string;
  description: string;
  anounce: string;
  closingDate: string;
  concourDate: string;
  concourSpeciality: { speciality: { name: string; id: string } }[];
}

export interface Paginate {
  currentPage: number;
  lastPage: number;
  next: number | null;
  perPage: number;
  prev: number | null;
  total: number;
}
