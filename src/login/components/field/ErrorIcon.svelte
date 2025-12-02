<script lang="ts">
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  const { kcClsx } = useKcClsx();
</script>

<span class={kcClsx('kcFormControlUtilClass')}>
  <span class={kcClsx('kcInputErrorIconStatusClass')}>
    <i
      class={kcClsx('kcInputErrorIconClass')}
      aria-hidden="true"
    ></i>
  </span>
</span>
