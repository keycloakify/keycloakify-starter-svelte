<script lang="ts">
  import { assert } from 'tsafe';
  import { kcSanitize } from '../../../@keycloakify/login-ui-svelte/kcSanitize';
  import Input from '../../components/field/Input.svelte';
  import { useI18n } from '../../i18n';
  import { useKcContext } from '../../KcContext.gen';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'code.ftl');

  const { msg } = useI18n();

  const { code } = kcContext;
</script>

<div id="kc-code">
  {#if code.success}
    <p>{@render msg('copyCodeInstruction')()}</p>
    {#snippet input(inputProps: { type: 'text'; id: string; 'aria-invalid': 'true' | undefined })}
      <input
        id="code"
        name="code"
        value={code.code}
        type={inputProps.type}
        aria-invalid={inputProps['aria-invalid']}
      />
    {/snippet}
    <Input
      label={undefined}
      renderInput={input}
    />
  {:else if code.error}
    <p id="error">{kcSanitize(code.error)}</p>
  {/if}
</div>
