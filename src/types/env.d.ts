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

/*
id: true,
        createdAt: true,
        establishment: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            title: true,
            cin: true,
          },
        },
        speciality: {
          select: {
            id: true,
            name: true,
          },
        },
        concour: {
          select: {
            id: true,
            name: true,
          },
        },
      },
*/

declare interface CandidatureIndex {
  id: string;
  createdAt: string;
  establishment: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    title: string;
    cin: string;
  };
  speciality: { id: string; name: string };
  concour: { id: string; name: string };
}

declare interface CandidatureShow {
  id?: string;
  state: string;
  motive: string;
  file?: File;
  user: {
    title: string;
    cin: string;
    firstName: string;
    firstNameArabic: string;
    lastName: string;
    lastNameArabic: string;
    birthDate: string;
    birthPlace: string;
    birthPlaceArabic: string;
    address: string;
    addressArabic: string;
    postalCode: string;
    city: string;
    cityArabic: string;
    email: string;
    phone: string;
  };
  degreeLevel: string;
  degreeTitle: string;
  degreeSpeciality: string;
  establishmentName: string;
  graduationCountry: string;
  graduationYear: string;
  establishment: string;
  speciality: { id: string; name: string };
  concour: { id: string; name: string };
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
