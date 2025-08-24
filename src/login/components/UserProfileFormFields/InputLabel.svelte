<script lang="ts">
  import type { Attribute } from '../../../@keycloakify/login-ui-svelte/useUserProfileForm';
  import { useI18n } from '../../i18n';

  const props: { attribute: Attribute; option: string } = $props();
  const { attribute, option } = props;
  const { advancedMsg } = useI18n();
</script>

{#if attribute.annotations.inputOptionLabels !== undefined}
  {@const { inputOptionLabels } = attribute.annotations}
  {@render advancedMsg(inputOptionLabels[option] ?? option)()}
{:else if attribute.annotations.inputOptionLabelsI18nPrefix !== undefined}
  {@render advancedMsg(`${attribute.annotations.inputOptionLabelsI18nPrefix}.${option}`)()}
{:else}
  {option}
{/if}
