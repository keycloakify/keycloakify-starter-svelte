<script lang="ts">
  import { assert } from 'tsafe/assert';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import { useKcContext } from '../../KcContext.gen';
  import { useI18n } from '../../i18n';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'select-authenticator.ftl');
  const { kcClsx } = useKcClsx();
  const { advancedMsg } = useI18n();

  const { auth, url } = kcContext;
</script>

<ul
  class={kcClsx('kcSelectAuthListClass')}
  role="list"
>
  {#each auth.authenticationSelections as authenticationSelection, index (authenticationSelection.authExecId)}
    <li class={kcClsx('kcSelectAuthListItemWrapperClass')}>
      <form
        id="kc-select-credential-form"
        class={kcClsx('kcFormClass')}
        action={url.loginAction}
        method="post"
      >
        <input
          type="hidden"
          name="authenticationExecution"
          value={authenticationSelection.authExecId}
        />
      </form>

      <div
        tabindex="0"
        role="button"
        class={kcClsx('kcSelectAuthListItemClass')}
        onclick={() => document.forms[index].requestSubmit()}
        onkeydown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            document.forms[index].requestSubmit();
            e.preventDefault();
          }
        }}
      >
        <div class="pf-v5-c-data-list__item-content">
          <div class={kcClsx('kcSelectAuthListItemIconClass')}>
            <i class={kcClsx('kcSelectAuthListItemIconPropertyClass', authenticationSelection.iconCssClass)}></i>
          </div>

          <div class={kcClsx('kcSelectAuthListItemBodyClass')}>
            <h2 class={kcClsx('kcSelectAuthListItemHeadingClass')}>
              {@render advancedMsg(authenticationSelection.displayName)()}
            </h2>
          </div>

          <div class={kcClsx('kcSelectAuthListItemDescriptionClass')}>
            {@render advancedMsg(authenticationSelection.helpText)()}
          </div>
        </div>

        <div class={kcClsx('kcSelectAuthListItemFillClass')}>
          <i
            class={kcClsx('kcSelectAuthListItemArrowIconClass')}
            aria-hidden="true"
          ></i>
        </div>
      </div>
    </li>
  {/each}
</ul>
