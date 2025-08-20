<script lang="ts">
  import { createRawSnippet } from 'svelte';
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
    <Input
      label={undefined}
      renderInput={() =>
        createRawSnippet(() => ({
          render: () => `<input
                            id="code"
                            name="code"
                            value="${code.code}"
                        />`,
        }))}
    />
  {:else if code.error}
    <p id="error">{kcSanitize(code.error)}</p>
  {/if}
</div>
