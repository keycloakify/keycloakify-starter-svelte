<script lang="ts">
  import { onMount } from 'svelte';
  import { derived } from 'svelte/store';
  import { assert } from 'tsafe/assert';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import { useUserProfileForm } from '../../../@keycloakify/login-ui-svelte/useUserProfileForm';
  import { useI18n } from '../../i18n';
  import { useKcContext } from '../../KcContext.gen';
  import Group from '../field/Group/Group.svelte';
  import DisplayableErrors from './DisplayableErrors.svelte';
  import GroupLabel from './GroupLabel.svelte';
  import type { UserProfileFormFieldsProps } from './UserProfileFormFieldsProps';
  import InputFieldByType from './InputFieldByType.svelte';

  const props: UserProfileFormFieldsProps = $props();
  const { onAreAllChecksPassedValueChange, renderBeforeField, renderAfterField } = props;

  const { kcContext } = useKcContext();

  assert('profile' in kcContext);

  const i18n = useI18n();

  const { advancedMsg } = i18n;

  const userProfileForm = useUserProfileForm({
    kcContext,
    i18n,
  });

  const { formState, dispatchFormAction } = userProfileForm;

  onMount(() => {
    const unsubscribe = formState.subscribe(({ areAllChecksPassed }) => {
      onAreAllChecksPassedValueChange(areAllChecksPassed);
    });
    return () => unsubscribe();
  });

  const { kcClsx } = useKcClsx();

  const groupNameRef = { current: '' };
  const formFieldStates = derived(formState, ($formState) => $formState.formFieldStates);
</script>

{#each $formFieldStates as formFieldState, i (i)}
  {@const { attribute, valueOrValues, displayableErrors } = formFieldState}

  {#snippet error()}
    <DisplayableErrors {displayableErrors}></DisplayableErrors>
  {/snippet}
  <GroupLabel
    {attribute}
    {groupNameRef}
  />
  {@render renderBeforeField?.({ attributeName: attribute.name, userProfileForm })}
  <Group
    inputId={attribute.name}
    label={advancedMsg(attribute.displayName ?? '')}
    required={attribute.required}
    style={attribute.annotations.inputType === 'hidden' ? 'display: none' : undefined}
    {error}
  >
    {#if attribute.annotations.inputHelperTextBefore}
      <div
        class={kcClsx('kcInputHelperTextBeforeClass')}
        id={`form-help-text-before-${attribute.name}`}
        aria-live="polite"
      >
        {@render advancedMsg(attribute.annotations.inputHelperTextBefore)()}
      </div>
    {/if}

    <InputFieldByType
      {attribute}
      {valueOrValues}
      {displayableErrors}
      {dispatchFormAction}
    />
    {#if attribute.annotations.inputHelperTextAfter !== undefined}
      <div
        class={kcClsx('kcInputHelperTextAfterClass')}
        id={`form-help-text-after-${attribute.name}`}
        aria-live="polite"
      >
        {@render advancedMsg(attribute.annotations.inputHelperTextAfter)()}
      </div>
    {/if}
  </Group>
  {@render renderAfterField?.({ attributeName: attribute.name, userProfileForm })}
  <!-- NOTE: Downloading of html5DataAnnotations scripts is done in the useUserProfileForm hook -->
{/each}
