<template lang="pug">
.navbar-container
  nav.navbar.container.pb-0
    .logo
      img(:src="logo")
    ul.nav-links.mb-0
      span.hamburger(@click="isMenuOpen = !isMenuOpen") {{ isMenuOpen ? "X" : "&#9776;" }}
      .menu(:class="{'d-flex': isMenuOpen}")
        li(:class="{ 'active': $route.path.includes('admin/concours') }")
          RouterLink(:to="{ name: 'admin_concours' }" ) Concours
        li(:class="{ 'active': $route.path.includes('admin/candidatures') }")
          RouterLink(:to="{ name: 'admin_candidatures' }") Candidatures
        li(:class="{ 'active': $route.path.includes('/admin/specialities') }")
          RouterLink(:to="{ name: 'admin_specialities' }") Specialities
</template>
<script lang="ts" setup>
import { ref } from "vue";
import logo from "@/assets/img/chu-new.png";

const isMenuOpen = ref(false);
</script>
<style lang="scss">
.navbar-container {
  background-color: white;
  position: sticky;

  a {
    text-decoration: none;
  }

  li {
    list-style: none;
    height: 72px;
    display: flex;
    align-items: center;
  }

  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #4c9e9e;

    .nav-links {
      a {
        color: $primary-color;
      }
      .hamburger {
        display: none;
        font-size: 24px;
        user-select: none;
      }
      .menu {
        display: flex;
        gap: 1em;
        font-size: 18px;

        li {
          padding: 5px 14px;

          &:hover,
          &.active {
            border-bottom: 3px solid $primary-color;
            transition: 0.1s ease;
          }

          &.sub-menu {
            position: relative;

            &:hover .dropdown,
            .dropdown:hover .dropdown {
              display: block;
            }

            .dropdown {
              background-color: white;
              padding: 1em 0;
              position: absolute;
              display: none;
              border-radius: 8px;
              top: 33px;
              right: -20px;

              li {
                padding: 0.5em 1em;
                width: 8em;
                text-align: center;

                & + li {
                  margin-top: 10px;
                }

                &:hover {
                  background-color: white;
                }
              }
            }
          }
        }
      }

      @media (max-width: 768px) {
        .hamburger {
          display: block;
          cursor: pointer;
          position: relative;
          z-index: 3;
        }
        .menu {
          display: none;
          flex-direction: column;
          justify-content: center;
          position: absolute;
          background-color: white;
          top: 72px;
          right: 0;
          left: 0;
          text-align: center;
          padding: 16px 0;
          li {
            display: inline;
            width: fit-content;
            align-self: center;
          }
          li + li {
            margin-top: 12px;
          }

          .dropdown {
            top: 30px;
            transform: translateX(35%);
          }
        }
      }
    }

    .logo {
      width: 72px;
      height: 72px;
      padding: 4px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
