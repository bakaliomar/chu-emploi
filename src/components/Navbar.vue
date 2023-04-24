<template lang="pug">
.navbar-container
  nav.navbar.container
    .logo
      img(:src="logo")
    ul.nav-links
      span.hamburger(@click="isMenuOpen = !isMenuOpen") {{ isMenuOpen ? "X" : "&#9776;" }}
      .menu(:class="{'d-block': isMenuOpen}")
        li
          a(href="/") Home
        li
          a(href="/") About

        li.sub-menu
          a(href="/") Services
          ul.dropdown
            li
              a(href="/") Dropdown 1
</template>
<script lang="ts" setup>
import { ref } from "vue";
import logo from "@/assets/img/chu-new.png";

const isMenuOpen = ref(false);
</script>
<style lang="scss">
.navbar-container {
  background-color: white;

  a {
    text-decoration: none;
  }

  li {
    list-style: none;
  }

  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #4c9e9e;
    height: 100px;

    .nav-links {
      height: 100%;
      display: flex;
      align-items: center;
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
        align-items: center;
        height: 100%;
        gap: 1em;
        font-size: 18px;

        li {
          padding: 5px 14px;
          height: 100%;
          display: flex;
          align-items: center;

          &:hover {
            border-bottom: 3px solid $primary;
            transition: 0.1s ease;
          }

          &.sub-menu {
            position: relative;

            &:hover .dropdown,
            .dropdown:hover .dropdown {
              display: block;
            }

            .dropdown {
              background-color: rgb(1, 139, 139);
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
                  background-color: #4c9e9e;
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
        }
        .menu {
          display: none;
          position: absolute;
          background-color: teal;
          right: 0;
          left: 0;
          text-align: center;
          padding: 16px 0;
          li:hover {
            display: inline-block;
            background-color: #4c9e9e;
            transition: 0.3s ease;
          }
          li + li {
            margin-top: 12px;
          }

          .dropdown {
            top: 30px;
            transform: translateX(35%);
          }
          .dropdown li:hover {
            background-color: #4c9e9e;
          }
        }
      }
    }

    .logo {
      width: 60px;
      height: 60px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
