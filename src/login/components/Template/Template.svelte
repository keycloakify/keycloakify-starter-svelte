<script lang="ts">
  import type { Snippet } from 'svelte';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import { useI18n } from '../../i18n';
  import { useKcContext } from '../../KcContext.gen';
  import AlertMessage from './AlertMessage.svelte';
  import LanguageSelect from './LanguageSelect.svelte';
  import RequiredFieldsNotice from './RequiredFieldsNotice.svelte';
  import { SocialProviders } from './SocialProviders';
  import TryAnotherWayLink from './TryAnotherWayLink.svelte';
  import { useInitializeTemplate } from './useInitializeTemplate';
  import UsernameBlock from './UsernameBlock.svelte';
  import UsernameRequiredFieldsWrapper from './UsernameRequiredFieldsWrapper.svelte';

  const props: {
    displayMessage?: boolean;
    displayRequiredFields?: boolean;
    displaySocialProviders?: boolean;
    slots: {
      header: Snippet;
      info?: Snippet;
      form: Snippet;
    };
  } = $props();
  const { displayMessage = true, displayRequiredFields = false, displaySocialProviders = false, slots } = props;

  const { kcClsx } = useKcClsx();
  const { msg } = useI18n();
  const { kcContext } = useKcContext();

  const { isReadyToRender } = useInitializeTemplate();
</script>

{#if $isReadyToRender}
  <div class={kcClsx('kcLogin')}>
    <div class={kcClsx('kcLoginContainer')}>
      <header
        id="kc-header"
        class="pf-v5-c-login__header"
      >
        <div
          id="kc-header-wrapper"
          class="pf-v5-c-brand"
        >
          {@render msg('loginTitleHtml', kcContext.realm.displayNameHtml)()}
        </div>
      </header>
      <main class={kcClsx('kcLoginMain')}>
        <div class={kcClsx('kcLoginMainHeader')}>
          <h1
            class={kcClsx('kcLoginMainTitle')}
            id="kc-page-title"
          >
            {@render slots.header()}
          </h1>
          <LanguageSelect />
        </div>
        <div class={kcClsx('kcLoginMainBody')}>
          {#snippet requiredFields()}
            {#if displayRequiredFields}
              <RequiredFieldsNotice />
            {/if}
          {/snippet}
          {#snippet username()}
            <UsernameBlock />
          {/snippet}
          <UsernameRequiredFieldsWrapper
            slots={{
              requiredFields: requiredFields,
              username: username,
            }}
          />
          {#if displayMessage}
            <AlertMessage />
          {/if}
          {@render slots.form()}
          <TryAnotherWayLink />
          <div class={kcClsx('kcLoginMainFooter')}>
            {#if displaySocialProviders}
              <SocialProviders />
            {/if}
            {#if slots.info}
              <div
                id="kc-info"
                class={kcClsx('kcLoginMainFooterBand', 'kcFormClass')}
              >
                <div
                  id="kc-info-wrapper"
                  class={kcClsx('kcLoginMainFooterBandItem')}
                >
                  {@render slots.info()}
                </div>
              </div>
            {/if}
          </div>
        </div>
      </main>
    </div>
  </div>
{/if}
