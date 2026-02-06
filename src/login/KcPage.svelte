<script lang="ts">
  import Template from './Template.svelte';
  import UserProfileFormFields from './components/UserProfileFormFields.svelte';
  import type { KcContext } from 'keycloakify/login/KcContext';
  import type { ClassKey } from 'keycloakify/login/lib/kcClsx';
  import type { Component } from 'svelte';
  import { useI18n } from './i18n/i18n';
  const { kcContext }: { kcContext: KcContext } = $props();
  const { i18n } = useI18n({ kcContext });
  // import "./main.css";
  
  import "./index.css";
// const classes = {
//     kcButtonClass: "",
//     kcButtonPrimaryClass: "",
//     kcButtonBlockClass: "",
//     kcButtonLargeClass: ""
// } satisfies { [key in ClassKey]?: string };
  const classes = {} satisfies { [key in ClassKey]?: string };
  const doMakeUserConfirmPassword = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
 // removing default css classes for some pages
   const doUseDefaultCss = (()=>{
    switch(kcContext.pageId){
      case "login.ftl": return false;
      case "register.ftl": return false;
      default: return true;
    }
  })();
 const page = async () => {
   switch (kcContext.pageId) {
     case 'login.ftl':
       return import('./pages/LoginTemp.svelte');
    case 'register.ftl':
      return import('./pages/RegisterTemp.svelte');

     default:
       return import('@keycloakify/svelte/login/DefaultPage.svelte');
   }
 }
</script>
<!-- 
{#await page() then { default: Page }}
  <Page
    {kcContext}
    {i18n}
    {classes}
    {Template}
    {UserProfileFormFields}
    doUseDefaultCss={true}
    {doMakeUserConfirmPassword}
  ></Page>
{/await}
 -->
{#await page() then { default: Page }}
    <Page
      {kcContext}
      i18n={i18n}
      {classes}
      {Template}
      {UserProfileFormFields}
      {doUseDefaultCss}
      {doMakeUserConfirmPassword}
    ></Page>
{/await}
