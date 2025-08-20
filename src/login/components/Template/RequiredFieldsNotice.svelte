<script lang="ts">
  import { clsx } from '../../../@keycloakify/login-ui-svelte/tools/clsx';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import { useI18n } from '../../i18n';

  const { kcClsx } = useKcClsx();
  const { msg } = useI18n();
</script>

<div class={clsx(kcClsx('kcLabelWrapperClass'), 'subtitle')}>
  <span class={kcClsx('kcInputHelperTextItemTextClass')}>
    <span class={kcClsx('kcInputRequiredClass')}>*</span>
    {@render msg('requiredFields')()}
  </span>
</div>
