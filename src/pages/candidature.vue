<template lang="pug">
.container.condidature-container
  .custom-card(v-if="!isDone")
    form(@submit.prevent="onSubmit" v-if="!confirmationStep")
      div
        h1.primary-title Formulaire de candidature
        hr.hr.mt-3
      .col-12.mt-2
        label.required Concours 
        br
        select.form-select.mt-2.shadow.bg-body.rounded(v-model="concour" placeholder="Concours" @change="loadSpecialities")
          option(v-for="item in concours" :key="item.id" :value="item.id") {{ item.name }}
        small.error {{ errors.concour }}
      .col-12.mt-2
        label.required Sp&eacute;ialit&eacute; 
        br
        select.form-select.mt-2.shadow.bg-body.rounded(:disabled="!concour && !specialities.length" v-model="speciality")
          option(v-for="item in specialities" :key="item.id" :value="item.id") {{ item.name }}
        small.error {{ errors.speciality }}
      .mt-4
        h4.secondary-title Identit&eacute;
        hr.hr.mt-0
      .row.mt-3
        .col-5.col-md-6.d-flex.align-items-center
          .form-check.d-flex.align-items-baseline
            input.form-check-input(type='radio' value="Mme" v-model="title")
            label.form-check-label.ms-2 Mme
          .form-check.d-flex.align-items-baseline.ms-3
            input.form-check-input(type='radio' value="Mr" v-model="title")
            label.form-check-label.ms-2 Mr
        .col-7.col-md-6.d-flex.align-items-center
          label.text-nowrap.required CIN 
          .form-group.ms-4
            input.form-control.shadow.bg-body.rounded(type='text' v-model="cin")
            small.error {{ errors.cin }}
      div
        hr.hr.mt-3
      .row.mt-5
        .form-group.col-12.col-md-6.col-lg-3
          label.required Pr&eacute;nom 
          input.form-control.shadow.bg-body.rounded(type='text' v-model="firstName")
          small.error {{ errors.firstName }}
        .form-group.col-12.col-md-6.col-lg-3.text-end.d-block
          label.text-end.arbic-required  &#x627;&#x644;&#x625;&#x633;&#x645; &#x627;&#x644;&#x634;&#x62E;&#x635;&#x64A;
          input.form-control.shadow.bg-body.rounded(type='text' v-model="firstNameArabic")
          small.error {{ errors.firstNameArabic }}
        .form-group.col-12.col-md-6.col-lg-3
          label.required Date de naissance 
          Datepicker.shadow.bg-body(v-model="birthDate")
          small.error {{ errors.birthDate }}
        .col-12.col-md-6.col-lg-3
      .row.mt-2
        .form-group.col-12.col-md-6.col-lg-3
          label.required Nom 
          input.form-control.shadow.bg-body.rounded(type='text' v-model="lastName")
          small.error {{ errors.lastName }}
        .form-group.col-12.col-md-6.col-lg-3.text-end.d-block
          label.text-end.arbic-required  &#x627;&#x644;&#x625;&#x633;&#x645; &#x627;&#x644;&#x639;&#x627;&#x626;&#x644;&#x64A;
          input.form-control.shadow.bg-body.rounded(type='text' v-model="lastNameArabic")
          small.error {{ errors.lastNameArabic }}
        .form-group.col-12.col-md-6.col-lg-3
          label.required Lieu de naissance 
          input.form-control.shadow.bg-body.rounded(type='text' v-model="birthPlace")
          small.error {{ errors.birthPlace }}
        .form-group.col-12.col-md-6.col-lg-3.text-end.d-block
          label.text-end.arbic-required  &#x645;&#x643;&#x627;&#x646; &#x627;&#x644;&#x625;&#x632;&#x62F;&#x64A;&#x627;&#x62F;
          input.form-control.shadow.bg-body.rounded(type='text' v-model="birthPlaceArabic")
          small.error {{ errors.birthPlaceArabic }}
      .row.mt-2
        .form-group.col-12.col-md-6
          label.required Adresse 
          textarea.form-control.shadow.bg-body.rounded(rows='3' v-model="address")
          small.error {{ errors.address }}
        .form-group.col-12.col-md-6.text-end.d-block
          label.arbic-required  &#x627;&#x644;&#x639;&#x646;&#x648;&#x627;&#x646;
          textarea.form-control.shadow.bg-body.rounded(rows='3' v-model="addressArabic")
          small.error {{ errors.addressArabic }}
      .row.mt-3
        .form-group.col-12.col-md-3
          label Code postal 
          input.form-control.shadow.bg-body.rounded(type='text' v-model="postalCode")
          small.error {{ errors.postalCode }}
        .col-12.col-md-3
        .form-group.col-12.col-md-3
          label.required Ville 
          input.form-control.shadow.bg-body.rounded(type='text' v-model="city")
          small.error {{ errors.city }}
        .form-group.col-12.col-md-3.text-end.d-block
          label.text-end.arbic-required  &#x627;&#x644;&#x645;&#x62F;&#x64A;&#x646;&#x629;
          input.form-control.shadow.bg-body.rounded(type='text' v-model="cityArabic")
          small.error {{ errors.cityArabic }}
      .mt-4
        h4.secondary-title Coordonn&eacute;es 
        hr.hr.mt-0
      .row.mt-3
        .form-group.col-12.col-md-6
          label.required Email 
          input.form-control.shadow.bg-body.rounded(type='text' v-model="email")
          small.error {{ errors.email }}
        .form-group.col-12.col-md-6
          label.required T&eacute;l&eacute;phone 
          input.form-control.shadow.bg-body.rounded(type='text' v-model="phone")
          small.error {{ errors.phone }}
      .mt-4
        h4.secondary-title Diplome 
        hr.hr.mt-0
      .row.mt-3
        .form-group.col-12.col-md-6
          label.required Titre du diplôme
          input.form-control.shadow.bg-body.rounded(type='text' v-model="degreeTitle")
          small.error {{ errors.degreeTitle }}
        .form-group.col-12.col-md-6
          label.required Spécialité du diplôme
          input.form-control.shadow.bg-body.rounded(type='text' v-model="degreeSpeciality")
          small.error {{ errors.degreeSpeciality }}
      .row.mt-3
        .form-group.col-12.col-md-6
          label.required Niveau du diplome 
          input.form-control.shadow.bg-body.rounded(type='text' v-model="degreeLevel")
          small.error {{ errors.degreeLevel }}
        .form-group.col-12.col-md-6
          label.required Nom de l&apos;&eacute;tablissement 
          input.form-control.shadow.bg-body.rounded(type='text' v-model="establishmentName")
          small.error {{ errors.establishmentName }}
      .row.mt-3
        .form-group.col-12.col-md-6
          label.required Pays 
          input.form-control.shadow.bg-body.rounded(type='text' v-model="graduationCountry")
          small.error {{  errors.graduationCountry }}
        .col-12.col-md-6.d-flex.align-items-center.mt-3
          .form-check.d-flex.align-items-baseline
            input.form-check-input(type='radio' value="public" v-model="establishment")
            label.form-check-label.ms-2 Public
          .form-check.ms-3.d-flex.align-items-baseline
            input.form-check-input(type='radio' value="prive" v-model="establishment")
            label.form-check-label.ms-2 Priv&eacute;
          .form-check.ms-3.d-flex.align-items-baseline
            input.form-check-input(type='radio' value="etranger" v-model="establishment")
            label.form-check-label.ms-2 Etranger
      .row.mt-3
        .form-group.col-12.col-md-6
          label.required Ann&eacute;e d&apos;obtention 
          input.form-control.shadow.bg-body.rounded(type='text' v-model="graduationYear")
          small.error {{ errors.graduationYear }}
        .form-group.col-12.col-md-6
          label.required Profession actuelle
          br
          select.form-select.shadow.bg-body.rounded(v-model="currentJob")
            option(value="Autres") Autres
            option(value="Non-fonctionnaire") Non-fonctionnaire
            option(value="Fonctionnaire") Fonctionnaire
            option(value="Ex-militaire") Ex-militaire
            option(value="Ex-combattant") Ex-combattant
          small.error {{ errors.currentJob }}
      .mt-4
        h4.secondary-title Documents attach&eacute;s 
        hr.hr.mt-0
        p
          | Copie l&eacute;galis&eacute;e de la CIN recto-verso + Demande manuscrite + CV + Autorisation administrative pour les fonctionnaires + Copie l&eacute;galis&eacute;e du dipl&ocirc;me + Attestation d&rsquo;&eacute;quivalence (obligatoire pour les dipl&ocirc;mes &eacute;trangers). Tous les documents doivent &ecirc;tre r&eacute;unis, Le document PDF doit avoir au moins 4 pages
      .form-group.col-12
        label.required Dossier 
        input.form-control.shadow.bg-body.rounded(type='file' ref="uploader")
        span(v-if="!fileError") Types de fichiers accept&eacute;s : pdf, Taille max. des fichiers : 5 MB
        small.error(v-else) {{ fileError }}
      .mt-4
        label.required Condition g&eacute;n&eacute;rales 
      .form-check.d-flex.mt-2.align-items-baseline
        input.form-check-input.checkk(type='checkbox' v-model="accept")
        span.ms-2.form-check-label.text-wrap(v-if="!conditionError")
          | J&rsquo;atteste que les informations ci-dessus sont exactes, j&rsquo;ai lu et j&rsquo;accepte les conditions g&eacute;n&eacute;rales de ce concours.
        small.error(v-else) {{ conditionError }}
      .d-flex.justify-content-center.mt-4
        button.submit-btn.rounded-pill.px-5.py-1(type='submit') Suivant
    .confirmation-step.px-5(v-else)
      h1.confirmation-step-title Récapitulatif de votre candidature
      .confirmation-step-text Merci de vérifier vos informations !
        br
        |Pour valider définitivement votre candidature, sélectionnez le bouton Envoyer en bas de cette page.
        br
        |Pour modifier vos informations, utilisez le bouton Précédent en bas de cette page.
      hr
      .confirmation-step-content
        CandidatureShow(:candidature="candidature")
        .d-flex.justify-content-center.mt-5
          button.btn.btn-precedent.rounded-pill.px-5.py-2(@click="confirmationStep = false") Précédent
          button.btn.btn-suivant.rounded-pill.px-5.py-2.ms-3(@click="sendData" :disabled="clicked") Envoyer
  .success-card-conatiner.d-flex.justify-content-center.align-items-center(v-else)
    .success-card.d-flex.aliign-items-center
      .success-card-message
        .text-end !تم إرسال طلبك بنجاح
        .text-start.mt-2 Votre candidature a bien été envoyée!
      .icon-wrraper.ms-3
        img.h-100.w-100(:src="checked")

</template>
<script lang="ts" setup>
import { onBeforeMount, ref, computed } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import useAxios from "@/composables/useAxios";
import { useNotification } from "@kyvg/vue3-notification";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import checked from "@/assets/img/checked.png";
import CandidatureShow from "@/components/CandidatureShow.vue";

const { handleSubmit, errors } = useForm({
  validationSchema: yup.object({
    concour: yup.string().required(),
    speciality: yup.string().required(),
    title: yup.string().required(),
    cin: yup.string().required(),
    firstName: yup.string().required(),
    firstNameArabic: yup.string().required(),
    lastName: yup.string().required(),
    lastNameArabic: yup.string().required(),
    birthDate: yup.date().required(),
    birthPlace: yup.string().required(),
    birthPlaceArabic: yup.string().required(),
    address: yup.string().required(),
    addressArabic: yup.string().required(),
    postalCode: yup.number().required(),
    city: yup.string().required(),
    cityArabic: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup
      .string()
      .matches(/[1-4]/g, "telphone doit etre shifres")
      .length(10)
      .required(),
    degreeLevel: yup.string().required(),
    degreeTitle: yup.string().required(),
    degreeSpeciality: yup.string().required(),
    establishmentName: yup.string().required(),
    graduationCountry: yup.string().required(),
    graduationYear: yup.number().required(),
    establishment: yup.string().required(),
    currentJob: yup.string().required(),
  }),
});

const { axios } = useAxios();
const concours = ref<{ name: string; id: string }[]>([]);
const specialities = ref<{ name: string; id: string }[]>([]);
const fileError = ref("");
const conditionError = ref("");
const accept = ref(false);
const confirmationStep = ref(false);
const isDone = ref(false);
const uploader = ref<HTMLInputElement | null>();
const file = ref<File | null>(null);
const { notify } = useNotification();

const clicked = ref(false);

const { value: concour } = useField("concour");
const { value: speciality } = useField("speciality");
const { value: title } = useField("title", undefined, {
  initialValue: "Mr",
});
const { value: cin } = useField("cin");
const { value: firstName } = useField("firstName");
const { value: firstNameArabic } = useField("firstNameArabic");
const { value: lastName } = useField("lastName");
const { value: lastNameArabic } = useField("lastNameArabic");
const { value: birthDate } = useField("birthDate");
const { value: birthPlace } = useField("birthPlace");
const { value: birthPlaceArabic } = useField("birthPlaceArabic");
const { value: address } = useField("address", undefined, {
  initialValue: "",
});
const { value: addressArabic } = useField("addressArabic", undefined, {
  initialValue: "",
});
const { value: postalCode } = useField("postalCode");
const { value: city } = useField("city");
const { value: cityArabic } = useField("cityArabic");
const { value: email } = useField("email");
const { value: phone } = useField("phone");
const { value: degreeLevel } = useField("degreeLevel");
const { value: degreeTitle } = useField("degreeTitle");
const { value: degreeSpeciality } = useField("degreeSpeciality");
const { value: establishmentName } = useField("establishmentName");
const { value: graduationCountry } = useField("graduationCountry");
const { value: currentJob } = useField("currentJob");
const { value: graduationYear } = useField("graduationYear");
const { value: establishment } = useField("establishment", undefined, {
  initialValue: "public",
});

const getSpeciality = computed(() => {
  return specialities.value.find((obj) => obj.id === speciality.value);
});

const getConcour = computed(() => {
  return concours.value.find((obj) => obj.id === concour.value);
});

const candidature = computed((): CandidatureShow => {
  return {
    user: {
      title: title.value,
      cin: cin.value as string,
      firstName: firstName.value as string,
      firstNameArabic: firstNameArabic.value as string,
      lastName: lastName.value as string,
      lastNameArabic: lastNameArabic.value as string,
      birthDate: birthDate.value as string,
      birthPlace: birthPlace.value as string,
      birthPlaceArabic: birthPlaceArabic.value as string,
      address: address.value as string,
      addressArabic: addressArabic.value as string,
      postalCode: postalCode.value as string,
      city: city.value as string,
      cityArabic: cityArabic.value as string,
      email: email.value as string,
      phone: phone.value as string,
    },
    currentJob: currentJob.value as string,
    degreeLevel: degreeLevel.value as string,
    degreeTitle: degreeTitle.value as string,
    degreeSpeciality: degreeSpeciality.value as string,
    establishmentName: establishmentName.value as string,
    graduationCountry: graduationCountry.value as string,
    graduationYear: graduationYear.value as string,
    establishment: establishment.value as string,
    speciality: getSpeciality.value as { id: string; name: string },
    concour: getConcour.value as { id: string; name: string },
    file: file.value as File,
  };
});

onBeforeMount(() => {
  axios.get("/concours/autocomplete").then(({ data }) => {
    concours.value = data;
  });
});

function loadSpecialities() {
  if (!concour.value) {
    specialities.value = [];
  } else {
    axios.get(`/concours/${concour.value}/specialities`).then(({ data }) => {
      specialities.value = data;
    });
  }
}

function readFileAsync(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

async function merge() {
  const PDFDocument = PDFLib.PDFDocument;

  const in1 = document.getElementById("file1").files[0];
  const in2 = document.getElementById("file2").files[0];
  const bytes1 = await readFileAsync(in1);
  const bytes2 = await readFileAsync(in2);
  const pdf1 = await PDFDocument.load(bytes1);
  const pdf2 = await PDFDocument.load(bytes2);

  const mergedPdf = await PDFDocument.create();
  const copiedPagesA = await mergedPdf.copyPages(pdf1, pdf1.getPageIndices());
  copiedPagesA.forEach((page) => mergedPdf.addPage(page));
  const copiedPagesB = await mergedPdf.copyPages(pdf2, pdf2.getPageIndices());
  copiedPagesB.forEach((page) => mergedPdf.addPage(page));
  const mergedPdfFile = await mergedPdf.save();

  download(
    mergedPdfFile,
    "pdf-lib_page_copying_example.pdf",
    "application/pdf"
  );
}

function sendData() {
  clicked.value = true;
  const formData = new FormData();
  formData.append("file", file.value!, file.value!.name);
  formData.append("title", title.value);
  formData.append("email", email.value as string);
  formData.append("cin", cin.value as string);
  formData.append("firstName", firstName.value as string);
  formData.append("firstNameArabic", firstNameArabic.value as string);
  formData.append("lastName", lastName.value as string);
  formData.append("lastNameArabic", lastNameArabic.value as string);
  formData.append("birthDate", (birthDate.value as Date).toISOString());
  formData.append("birthPlace", birthPlace.value as string);
  formData.append("birthPlaceArabic", birthPlaceArabic.value as string);
  formData.append("city", city.value as string);
  formData.append("cityArabic", cityArabic.value as string);
  formData.append("codePostal", postalCode.value as string);
  formData.append(
    "phone",
    `+212${(phone.value as string).substring(
      1,
      (phone.value as string).length
    )}`
  );
  formData.append("address", address.value as string);
  formData.append("addressArabic", addressArabic.value as string);
  formData.append("graduationYear", graduationYear.value as string);
  formData.append("graduationCountry", graduationCountry.value as string);
  formData.append("degreeLevel", degreeLevel.value as string);
  formData.append("degreeTitle", degreeTitle.value as string);
  formData.append("degreeSpeciality", degreeSpeciality.value as string);
  formData.append("concourId", concour.value as string);
  formData.append("establishment", establishment.value as string);
  formData.append("currentJob", currentJob.value as string);
  formData.append("establishmentName", establishmentName.value as string);
  formData.append("specialityId", speciality.value as string);

  axios
    .post("candidatures", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => {
      notify({
        type: "success",
        title: "candiadautre added successfully",
      });
      isDone.value = true;
    })
    .finally(() => {
      clicked.value = false;
    });
}

function checkFilePages(): Promise<number> {
  return new Promise((resolve, reject) => {
    try {
      if (file.value) {
        const reader = new FileReader();
        reader.readAsBinaryString(file.value);
        reader.onloadend = function () {
          const count = reader.result
            ? (reader.result as string).match(/\/Type[\s]*\/Page[^s]/g)!.length
            : 0;
          resolve(count);
        };
      }
    } catch (e) {
      reject(e);
    }
  });
}

onsubmit = handleSubmit(async () => {
  if ((!uploader.value?.files?.length && !file.value) || !accept.value) {
    fileError.value = accept.value ? "file is a required field" : "";
    conditionError.value = !accept.value
      ? "you have to accept the general condition"
      : "";
    return;
  }
  if (uploader.value?.files?.length) file.value = uploader.value.files[0];
  fileError.value = "";
  conditionError.value = "";
  const count: number = await checkFilePages();
  if (count < 4) {
    fileError.value =
      "valider votre dossier il n'est pas complet (le document PDF doit avoir au moins 4 pages)";
    return;
  }
  confirmationStep.value = true;
});
</script>
<style lang="scss">
.condidature-container {
  .hr {
    border: 1px solid #b7b7b7;
  }

  .secondary-title {
    font-family: "Arial";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    /* identical to box height */

    color: #10529e;
  }

  .submit-btn {
    background-color: #10529e;
    opacity: 0.96;
    color: white;
    border: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }
  .pr {
    font-weight: 500;
  }
  .checkk {
    min-width: 16px !important;
    min-height: 16px !important;
  }
  .confirmation-step {
    .confirmation-step-title {
      margin-top: 18px;
      font-style: normal;
      font-weight: 700;
      font-size: 30px;
      line-height: 34px;
      color: #10529e;
    }
    .confirmation-step-text {
      margin-top: 27px;
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 28px;
    }
    hr {
      border-bottom: 1px solid #b7b7b7;
    }
    .btn {
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 28px;
      color: #ffffff;
    }
    .btn-precedent {
      background: #c9c9c9;
      opacity: 0.96;
    }
    .btn-suivant {
      background: #10529e;
      opacity: 0.96;
    }
  }
  .success-card-conatiner {
    min-height: calc(100vh - 32px);
    .success-card {
      border-radius: 35px;
      background-color: white;
      padding-bottom: 60px;
      padding-top: 60px;
      padding-left: 90px;
      padding-right: 90px;

      .icon-wrraper {
        width: 87px;
        height: 87px;
      }

      .success-card-message {
        font-style: normal;
        font-weight: 700;
        font-size: 39px;
        line-height: 45px;
      }
    }
  }
}
</style>
<route lang="json5">
{
  meta: {
    auth: "guest",
  },
}
</route>
