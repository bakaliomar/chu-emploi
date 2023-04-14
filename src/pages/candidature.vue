<template lang="pug">
.container.condidature-container
  form.row.px-3.py-4.border.my-5
    div
      h1.primary-title Formulaire de candidature
      hr.hr.mt-3
    .col-12.mt-2
      label.required Concours 
      br
      select.form-select.mt-2.shadow.bg-body(aria-label='Default select example')
        option(selected='') Open this select menu
        option(value='1') One
        option(value='2') Two
        option(value='3') Three
    .col-12.mt-2
      label.required Sp&eacute;ialit&eacute; 
      br
      select.form-select.mt-2.shadow.bg-body.rounded(aria-label='Default select example')
        option(selected='') Open this select menu
        option(value='1') One
        option(value='2') Two
        option(value='3') Three
    .mt-4
      h4.secondary-title Identit&eacute;
      hr.hr.mt-0
    .col-5.col-md-6.d-flex.align-items-center
      .form-check.d-flex.align-items-baseline
        input.form-check-input(type='checkbox')
        label.form-check-label.ms-2 Mme
      .form-check.d-flex.align-items-baseline.ms-3
        input.form-check-input(type='checkbox')
        label.form-check-label.ms-2 Mr
    .col-7.col-md-6.d-flex.align-items-center
      label.text-nowrap.required CIN 
      .form-group.ms-4
        input.form-control.shadow.bg-body.rounded(type='text')
    div
      hr.hr.mt-3
    .form-group.col-12.col-md-6.col-lg-3
      label.required Pr&eacute;nom 
      input.form-control.shadow.bg-body.rounded(type='text')
    .form-group.col-12.col-md-6.col-lg-3
      label.text-end.d-block.arbic-required  &#x627;&#x644;&#x625;&#x633;&#x645; &#x627;&#x644;&#x634;&#x62E;&#x635;&#x64A;
      input.form-control.shadow.bg-body.rounded(type='text')
    .form-group.col-12.col-md-6.col-lg-3
      label.required Date de naissance 
      input.form-control.shadow.bg-body.rounded(type='text')
    .col-12.col-md-6.col-lg-3
    .form-group.col-12.col-md-6.col-lg-3
      label.required Nom 
      input.form-control.shadow.bg-body.rounded(type='text')
    .form-group.col-12.col-md-6.col-lg-3
      label.text-end.d-block.arbic-required  &#x627;&#x644;&#x625;&#x633;&#x645; &#x627;&#x644;&#x639;&#x627;&#x626;&#x644;&#x64A;
      input.form-control.shadow.bg-body.rounded(type='text')
    .form-group.col-12.col-md-6.col-lg-3
      label.required Lieu de naissance 
      input.form-control.shadow.bg-body.rounded(type='text')
    .form-group.col-12.col-md-6.col-lg-3
      label.text-end.d-block.arbic-required  &#x645;&#x643;&#x627;&#x646; &#x627;&#x644;&#x625;&#x632;&#x62F;&#x64A;&#x627;&#x62F;
      input.form-control.shadow.bg-body.rounded(type='text')
    .form-group.col-12.col-md-6
      label.required Adresse 
      textarea.form-control.shadow.bg-body.rounded(rows='3')
    .form-group.col-12.col-md-6.text-end.d-block
      label.arbic-required  &#x627;&#x644;&#x639;&#x646;&#x648;&#x627;&#x646;
      textarea.form-control.shadow.bg-body.rounded(rows='3')
    .form-group.col-12.col-md-3
      label Code postal 
      input.form-control.shadow.bg-body.rounded(type='text')
    .form-group.col-12.col-md-3
    .form-group.col-12.col-md-3
      label.required Ville 
      input.form-control.shadow.bg-body.rounded(type='text')
    .col-12.col-md-3
      label.text-end.d-block.arbic-required  &#x627;&#x644;&#x645;&#x62F;&#x64A;&#x646;&#x629;
      input.form-control.shadow.bg-body.rounded(type='text')
    .mt-4
      h4.secondary-title Coordonn&eacute;es 
      hr.hr.mt-0
    .form-group.col-12.col-md-6
      label.required Email 
      input.form-control.shadow.bg-body.rounded(type='text')
    .form-group.col-12.col-md-6
      label.required T&eacute;l&eacute;phone 
      input.form-control.shadow.bg-body.rounded(type='text')
    .mt-4
      h4.secondary-title Diplome 
      hr.hr.mt-0
    .form-group.col-12.col-md-6
      label.required Niveau du diplome 
      input.form-control.shadow.bg-body.rounded(type='text')
    .form-group.col-12.col-md-6
      label.required Nom de l&apos;&eacute;tablissement 
      input.form-control.shadow.bg-body.rounded(type='text')
    .form-group.col-12.col-md-6
      label.required Pays 
      input.form-control.shadow.bg-body.rounded(type='text')
    .col-12.col-md-6.d-flex.align-items-center.mt-3
      .form-check.d-flex.align-items-baseline
        input.form-check-input(type='checkbox')
        label.form-check-label.ms-2 Public
      .form-check.ms-3.d-flex.align-items-baseline
        input.form-check-input(type='checkbox')
        label.form-check-label.ms-2 Priv&eacute;
      .form-check.ms-3.d-flex.align-items-baseline
        input.form-check-input(type='checkbox')
        label.form-check-label.ms-2 Etranger
    .form-group.col-12.col-md-6
      label.required Ann&eacute;e d&apos;obtention 
      input.form-control.shadow.bg-body.rounded(type='text')
    .form-group.col-12.col-md-6
    .mt-4
      h4.secondary-title Documents attach&eacute;s 
      hr.hr.mt-0
      p
        | Copie l&eacute;galis&eacute;e de la CIN recto-verso + Demande manuscrite + CV + Autorisation administrative pour les fonctionnaires + Copie l&eacute;galis&eacute;e du dipl&ocirc;me + Attestation d&rsquo;&eacute;quivalence (obligatoire pour les dipl&ocirc;mes &eacute;trangers). Tous les documents doivent &ecirc;tre r&eacute;unis
    .form-group.col-12
      label.required Dossier 
      input.form-control.shadow.bg-body.rounded(type='file')
      span Types de fichiers accept&eacute;s : pdf, Taille max. des fichiers : 50 MB
    .mt-4
      label.required Condition g&eacute;n&eacute;rales 
    .form-check.d-flex.mt-2.align-items-baseline
      input.form-check-input.checkk(type='checkbox')
      span.ms-2.form-check-label.text-wrap
        | J&rsquo;atteste que les informations ci-dessus sont exactes, j&rsquo;ai lu et j&rsquo;accepte les conditions g&eacute;n&eacute;rales de ce concours.
    .d-flex.justify-content-center.mt-4
      button.submit-btn.rounded-pill.px-5.py-1(type='submit') Suivant
    
</template>
<style lang="scss">
.condidature-container {
  .primary-title {
    font-family: "Arial";
    font-style: normal;
    font-weight: 700;
    font-size: 25px;
    line-height: 29px;
    color: #10529e;
  }

  .hr {
    border: 1px solid #b7b7b7;
  }

  label {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    color: #000000;
    margin-top: 15px;
    &.required::after,
    &.arbic-required::before {
      content: "*";
      color: red;
    }
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

  form {
    border-radius: 35px;
    background-color: white;
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
    width: 16px !important;
    height: 16px !important;
  }
}
</style>
