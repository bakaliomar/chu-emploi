<template lang="pug">
#default-layout
  .overlay-container
    #page-content
      RouterView
    #page-footer.text-center Copyright © 2023 CHU Mohammed VI - Tanger
</template>
<style lang="scss">
#default-layout {
  background-image: url("@/assets/img/background-img.jpeg");
  background-size: cover;
  min-height: 100vh;

  .overlay-container {
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    overflow-y: auto;
  }
  #page-content {
    min-height: calc(100vh - 32px);
  }
  #page-footer {
    font-weight: 700;
    padding-top: 6px;
    padding-bottom: 6px;
  }
}
</style>
