<template lang="pug">
.container.login-page 
  .login-card-container.d-flex.align-items-center
    .login-card.d-flex.w-100
      .login-card-img.w-50
        img.h-100.w-100(:src="chLoginImg")
      .login-card-body.w-50.d-flex.flex-column
        svg.mt-1(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320")
          path(fill="#FFFFFF" fill-opacity="1" d="M0,0L80,5.3C160,11,320,21,480,53.3C640,85,800,139,960,149.3C1120,160,1280,128,1360,112L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z")
        form.flex-grow-1.d-flex.align-items-center.w-100(@submit.prevent="onSubmit")
          .inputs-wrapper.w-100.p-2
            .form-field.w-100.d-flex.align-items-center.mt-3
              .img-container.h-100.p-2
                img.h-100(:src="userIcon")
              input.w-100(type="text" placeholder="CIN ou Adresse Email" v-model="username")
            small.error {{ errors.username }}
            .form-field.w-100.d-flex.align-items-center.mt-3
              .img-container.h-100.p-2
                img.h-100(:src="lockIcon")
              input(type="password" placeholder="Mot de Pase" v-model="password")
            small.error {{ errors.password }}
            .d-flex.justify-content-center.mt-3
              button.connect-btn.btn.rounded-pill.mb-5.px-5.py-2(type="submit") Se Connect
            
</template>
<script lang="ts" setup>
import { ref } from "vue";
import chLoginImg from "@/assets/img/ch-login-img.png";
import userIcon from "@/assets/img/user-icon.png";
import lockIcon from "@/assets/img/lock-icon.png";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import useAxios from "@/composables/useAxios";
import { useAuthStore } from "@/store/useAuth.store";
import { useRouter } from "vue-router";

const { handleSubmit, errors } = useForm({
  validationSchema: yup.object({
    username: yup.string().required(),
    password: yup.string().required().max(32),
  }),
});

const { value: username } = useField("username");
const { value: password } = useField("password");
const loading = ref(false);
const { axios } = useAxios();
const { setAccessToken, setRefreshToken, fetchUser } = useAuthStore();
const router = useRouter();

const onSubmit = handleSubmit(() => {
  loading.value = true;
  axios
    .post("/auth/signin", {
      userName: username.value,
      password: password.value,
    })
    .then(async ({ data }) => {
      await setAccessToken(data.access_token);
      await setRefreshToken(data.refresh_token);
      await fetchUser();
      await router.push("/concours/new");
    })
    .finally(() => {
      loading.value = false;
    });
});
</script>
<style lang="scss">
.login-page {
  height: 100%;
  min-height: calc(100vh - 32px);
  padding: 16px;
  .login-card-container {
    min-height: calc(100vh - 64px);
    .login-card {
      min-height: 60vh;
      width: 100%;

      .login-card-body {
        margin-top: 6.9rem;
        margin-bottom: 5.8rem;
        margin-left: -2px;
        form {
          background-color: $white;
          .form-field {
            width: 100%;
            height: 52px;
            input {
              height: 100%;
              border: 2px solid darkgray;
              border-top-right-radius: 40px;
              border-bottom-right-radius: 40px;
              border-left: 0;
              width: 100%;
              display: block;
              background-color: #fafbfb;
              box-shadow: $box-shadow--modal;
              padding: 5px;
              font-style: normal;
              font-weight: 400;
              font-size: 20px;
              line-height: 24px;

              &:active,
              &:focus {
                border-left: 0;
                outline-width: 0;
              }
            }

            .img-container {
              border-top-left-radius: 40px;
              border-bottom-left-radius: 40px;
              border: 2px solid darkgray;
              border-right: 0;
              box-shadow: $box-shadow--modal;
            }
          }

          .connect-btn {
            background-color: #10529e;
            color: white;
            font-style: normal;
            font-weight: 700;
            font-size: 30px;
            line-height: 37px;
            border: 0;
            &:hover {
              background-color: #22aee5;
              cursor: pointer;
            }
            &.disabled {
              background-color: $muted-color;
            }
          }
        }
      }

      @include media-breakpoint-down(xxl) {
        .login-card-body {
          margin-top: 6rem;
          margin-bottom: 5rem;
        }
      }
      @include media-breakpoint-down(xl) {
        .login-card-body {
          margin-top: 5.2rem;
          margin-bottom: 4.4rem;
        }
      }
      @include media-breakpoint-down(lg) {
        .login-card-body {
          margin-top: 5.2rem;
          margin-bottom: 4.4rem;
        }
      }
      @include media-breakpoint-down(md) {
        .login-card-body {
          margin-top: 5.2rem;
          margin-bottom: 4.4rem;
        }
      }
    }
    @include media-breakpoint-down(md) {
      .login-card {
        display: flex;
        flex-direction: column;
        .login-card-body {
          width: 100% !important;
          margin-top: -3.6rem;
          svg {
            display: none;
          }
        }
        .login-card-img {
          width: 100% !important;
        }
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
