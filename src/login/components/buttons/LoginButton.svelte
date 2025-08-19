<script lang="ts">
  import { useReducer } from '../../../@keycloakify/login-ui-svelte/tools/useReducer';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import { useI18n } from '../../i18n';
  import ActionGroup from './ActionGroup.svelte';
  import Button from './Button.svelte';

  type Props = {
    className?: string;
  };
  const { className }: Props = $props();
  const { kcClsx } = useKcClsx();
  const { msg } = useI18n();
  const [hasBeenClicked, setClicked] = useReducer(() => true, false);
</script>

<ActionGroup {className}>
  <Button
    class={kcClsx('kcButtonPrimaryClass', 'kcButtonBlockClass')}
    id="kc-login"
    name="login"
    disabled={$hasBeenClicked}
    onclick={() => {
      setClicked();
    }}
  >
    {@render msg('doLogIn')()}
  </Button>
</ActionGroup>
