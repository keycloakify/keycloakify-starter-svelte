<script lang="ts">
  import { assert } from 'tsafe/assert';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import { useI18n } from '../../i18n';

  const { msgStr, currentLanguage, enabledLanguages } = useI18n();
  const { kcClsx } = useKcClsx();
</script>

{#if enabledLanguages.length > 1}
  <div class={kcClsx('kcLoginMainHeaderUtilities')}>
    <div class={kcClsx('kcInputClass')}>
      <select
        aria-label={msgStr('languages')}
        id="login-select-toggle"
        onchange={(e) => {
          const languageTag = e.currentTarget.value;

          const enabledLanguage = enabledLanguages.find(
            (enabledLanguage) => enabledLanguage.languageTag === languageTag,
          );

          assert(enabledLanguage !== undefined);

          window.location.href = enabledLanguage.href;
        }}
        value={currentLanguage.languageTag}
      >
        {#each enabledLanguages as { languageTag, label } (languageTag)}
          <option value={languageTag}>
            {label}
          </option>
        {/each}
      </select>
      <span class={kcClsx('kcFormControlUtilClass')}>
        <span class={kcClsx('kcFormControlToggleIcon')}>
          <svg
            class="pf-v5-svg"
            viewBox="0 0 320 512"
            fill="currentColor"
            aria-hidden="true"
            role="img"
            width="1em"
            height="1em"
          >
            <path
              d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
            ></path>
          </svg>
        </span>
      </span>
    </div>
  </div>
{/if}
