<script lang="ts">
  import { assert } from 'tsafe/assert';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import { useKcContext } from '../../KcContext.gen';
  import ActionGroup from '../../components/buttons/ActionGroup.svelte';
  import Button from '../../components/buttons/Button.svelte';
  import { useI18n } from '../../i18n';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'terms.ftl');
  const { kcClsx } = useKcClsx();
  const { msg } = useI18n();

  const { url } = kcContext;
</script>

<div class={kcClsx('kcContentWrapperClass')}>
  {@render msg('termsText')()}
</div>

<form
  class={kcClsx('kcFormClass')}
  action={url.loginAction}
  method="POST"
>
  <ActionGroup horizontal={true}>
    <Button
      type="submit"
      class={kcClsx('kcButtonPrimaryClass')}
      name="accept"
      id="kc-accept"
    >
      {@render msg('doAccept')()}
    </Button>
    <Button
      type="submit"
      class={kcClsx('kcButtonSecondaryClass')}
      name="cancel"
      id="kc-decline"
    >
      {@render msg('doDecline')()}
    </Button>
  </ActionGroup>
</form>

<div class="clearfix"></div>
