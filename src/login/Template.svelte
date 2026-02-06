<script lang="ts">
  import { useInitialize } from '@keycloakify/svelte/login/Template.useInitialize';
  import type { TemplateProps } from '@keycloakify/svelte/login/TemplateProps';
  import { useSetClassName } from '@keycloakify/svelte/tools/useSetClassName';
  import { kcSanitize } from 'keycloakify/lib/kcSanitize';
  import { getKcClsx } from 'keycloakify/login/lib/kcClsx';
  import { clsx } from 'keycloakify/tools/clsx';
  import { onMount } from 'svelte';
  import type { I18n } from './i18n/i18n';
  import type { KcContext } from './KcContext';

  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields = false,
    headerNode,
    socialProvidersNode = null,
    infoNode = null,
    documentTitle,
    bodyClassName,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
    children,
  }: TemplateProps<KcContext, I18n> = $props();
  const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

  const { msgStr, currentLanguage, enabledLanguages } = $i18n;

  const { realm, auth, url, message, isAppInitiatedAction } = kcContext;
  onMount(() => {
    document.title = documentTitle ?? msgStr('loginTitle', kcContext.realm.displayName);
  });
  useSetClassName({
    qualifiedName: 'html',
    className: kcClsx('kcHtmlClass'),
  });

  useSetClassName({
    qualifiedName: 'body',
    className: bodyClassName ?? kcClsx('kcBodyClass'),
  });
  const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });
</script>

{#if $isReadyToRender}
  <div class="w-full flex justify-center font-sans min-h-screen" style="font-family: 'Nunito Sans', sans-serif;">
    <div class="w-full max-w-7xl flex flex-row min-h-screen">
    <div class="flex w-[40%] flex-col pt-32 px-16 text-white">
        <h1 class="text-[64px] font-bold">BoXe</h1>
        <p class="text-xl font-normal mb-4 opacity-90 leading-relaxed">
            Start selling online in<br>just a few minutes.
        </p>
        <div class="w-22 h-px bg-white/80 mb-16"></div>
        
        <div class="mt-4">
            <p class="mb-2.5 font-normal">
                {kcContext.pageId === 'register.ftl' ? 'Already a user?' : 'Not Registered yet?'}
            </p>
            
           <a href={kcContext.pageId === 'register.ftl' ? url.loginUrl : (url as any).registrationUrl ?? '#'} 
       class="inline-block border border-white/40 rounded-md py-2 px-12 hover:bg-white hover:text-[#431048] transition-all duration-300">
        {kcContext.pageId === 'register.ftl' ? 'Sign In' : 'Sign Up'}
    </a>
        </div>
    </div>
    
   <div class="w-full lg:w-[60%] flex items-center justify-center">
    <div class="w-full max-w-222 bg-white rounded-md shadow-2xl  flex flex-col h-full pt-34 items-center px-6 sm:px-8 lg:px-22 overflow-y-auto">  
            <header class="mb-6 w-full">
                <h2 class="text-3xl font-bold text-left text-black">
                    {@render headerNode?.()}
                </h2>
            </header>

            {#if displayMessage && message !== undefined && (message.type !== 'warning' || !isAppInitiatedAction)}
                <div class="w-full mb-6 p-4 rounded-md text-sm {message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}">
                    {@html kcSanitize(message.summary)}
                </div>
            {/if}

            <div id="kc-content" class="w-full flex-1">
                {@render children?.()}
            </div>

            {#if displayInfo}
                <div class="pb-12 text-left w-full">
                    {@render infoNode?.()}
                </div>
            {/if}
        </div>
    </div>
    </div>

  </div>
{/if}