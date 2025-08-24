<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements';
  import { clsx, type CxArg } from '../../../../@keycloakify/login-ui-svelte/tools/clsx';
  import { useKcClsx } from '../../../../@keycloakify/login-ui-svelte/useKcClsx';
  import { useI18n } from '../../../i18n';
  import { useKcContext } from '../../../KcContext.gen';
  import LinkDisabledOnceClicked from '../../LinkDisabledOnceClicked.svelte';
  import LinkLabel from './LinkLabel.svelte';

  const { kcContext } = useKcContext();
  const { kcClsx } = useKcClsx();
  const { msg } = useI18n();
</script>

{#if kcContext.social?.providers?.length}
  {@const { providers } = kcContext.social}
  <div class={kcClsx('kcLoginMainFooterBand')}>
    <span class={kcClsx('kcLoginMainFooterBandItem', 'kcLoginMainFooterHelperText')}>
      {msg('identity-provider-login-label')}
    </span>
  </div>
  <div
    id="kc-social-providers"
    class={kcClsx('kcFormSocialAccountSectionClass')}
  >
    <ul class={kcClsx('kcFormSocialAccountListClass', providers.length > 3 && 'kcFormSocialAccountListGridClass')}>
      {#snippet link({ anchorProps, isDisabled }: { anchorProps: HTMLAnchorAttributes; isDisabled: boolean })}
        <a
          {...anchorProps}
          class={clsx(anchorProps.class as CxArg, isDisabled && kcClsx('kcFormSocialAccountListButtonDisabledClass'))}
        ></a>
      {/snippet}
      {#each providers as p (p)}
        <li class={kcClsx(providers.length > 3 ? 'kcFormSocialAccountGridItem' : 'kcFormSocialAccountListItemClass')}>
          <LinkDisabledOnceClicked
            id={`social-${p.alias}`}
            class={kcClsx('kcFormSocialAccountListButtonClass')}
            aria-label={p.displayName}
            type="button"
            href={p.loginUrl}
            renderLink={link}
          >
            <LinkLabel provider={p} />
          </LinkDisabledOnceClicked>
        </li>
      {/each}
    </ul>
  </div>
{/if}
