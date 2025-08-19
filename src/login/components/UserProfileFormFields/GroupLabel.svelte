<script lang="ts">
  import { createRawSnippet } from 'svelte';
  import { assert } from 'tsafe/assert';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import type { Attribute } from '../../../@keycloakify/login-ui-svelte/useUserProfileForm';
  import { useI18n } from '../../i18n';
  const props: {
    attribute: Attribute;
    groupNameRef: {
      current: string;
    };
  } = $props();
  const { attribute, groupNameRef } = props;

  const { advancedMsg } = useI18n();

  const { kcClsx } = useKcClsx();
  let isGrouplabel = $state<boolean>(false);
  if (attribute.group?.name !== groupNameRef.current) {
    groupNameRef.current = attribute.group?.name ?? '';

    if (groupNameRef.current !== '') {
      assert(attribute.group !== undefined);
      isGrouplabel = true;
    }
  }
  const html5DataAnnotations = {
    ...Object.fromEntries(
      Object.entries(attribute.group?.html5DataAnnotations ?? {}).map(([key, value]) => [`data-${key}`, value]),
    ),
  };
</script>

{#if isGrouplabel}
  {@const groupDisplayHeader = attribute.group?.displayHeader ?? ''}
  {@const groupDisplayDescription = attribute.group?.displayDescription ?? ''}
  {@const groupHeaderText =
    groupDisplayHeader !== ''
      ? advancedMsg(groupDisplayHeader)
      : createRawSnippet(() => ({ render: () => attribute.group?.name ?? '' }))}
  <div
    class={kcClsx('kcFormGroupClass')}
    {...html5DataAnnotations}
  >
    <div class={kcClsx('kcContentWrapperClass')}>
      <label
        id={`header-${attribute.group?.name}`}
        class={kcClsx('kcFormGroupHeader')}
      >
        {@render groupHeaderText()}
      </label>
    </div>
    {#if groupDisplayDescription !== ''}
      {@const groupDescriptionText = advancedMsg(groupDisplayDescription)}
      <div class={kcClsx('kcLabelWrapperClass')}>
        <label
          id={`description-${attribute.group?.name}`}
          class={kcClsx('kcLabelClass')}
        >
          {@render groupDescriptionText()}
        </label>
      </div>
    {/if}
  </div>
{/if}
