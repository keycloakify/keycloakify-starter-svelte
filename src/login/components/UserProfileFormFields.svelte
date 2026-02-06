<script lang="ts">
  import FieldErrors from './FieldErrors.svelte';
  import GroupLabel from './GroupLabel.svelte';
  import InputFieldByType from './InputFieldByType.svelte';
  import type { UserProfileFormFieldsProps } from '@keycloakify/svelte/login/components/UserProfileFormFieldsProps';
  import { useUserProfileForm } from '@keycloakify/svelte/login/lib/useUserProfileForm';
  import { onMount } from 'svelte';
  import { derived } from 'svelte/store';
  import type { I18n } from '../i18n/i18n';
  import type { KcContext } from '../KcContext';
  

  const props: UserProfileFormFieldsProps<KcContext, I18n> = $props();
  const {
    kcContext,
    i18n,
    kcClsx,
    onIsFormSubmittableValueChange,
    doMakeUserConfirmPassword,
    beforeField,
    afterField,
  } = props;

  const { advancedMsg } = $i18n;

  const { formState, dispatchFormAction } = useUserProfileForm({
    kcContext,
    i18n: $i18n,
    doMakeUserConfirmPassword,
  });
  onMount(() => {
    const unsubscribe = formState.subscribe(({ isFormSubmittable }) => {
      onIsFormSubmittableValueChange(isFormSubmittable);
    });
    return () => unsubscribe();
  });
  const placeholderMap: Record<string, string> = {
    firstName: 'Jack',
    lastName: 'Albert',
    email: 'example@email.com',
    password: 'Create your password'
};
const labelMap: Record<string, string> = {
    email: 'Email Address' 
};
const buttonTextMap: Record<string, string> = {
  register: 'Create Account', // your custom text
  login: 'Log In'             // keep default for login page
};

// Determine page type (for example, using kcContext)
const isRegisterPage = kcContext.pageId === 'register.ftl';
const registerButtonText = isRegisterPage ? buttonTextMap.register : buttonTextMap.login;


  const groupNameRef = { current: '' };
  const formFieldStates = derived(formState, ($formState) => $formState.formFieldStates);
  const displayableErrors = derived(formFieldStates, ($formFieldStates) =>
    $formFieldStates.map((f) => f.displayableErrors),
  );

  const desiredOrder = ['firstName', 'lastName', 'email', 'password'];
  const sortedFormFieldStates = derived(formFieldStates, ($formFieldStates) => {
    const ordered: typeof $formFieldStates = [];
    const rest: typeof $formFieldStates = [];

    // Push fields in desired order first
    for (const name of desiredOrder) {
        const field = $formFieldStates.find(f => f.attribute.name === name);
        if (field) ordered.push({
            ...field,
            attribute: {
                ...field.attribute,
                displayName: labelMap[field.attribute.name] ?? field.attribute.displayName,
                annotations: {
                    ...field.attribute.annotations,
                    inputTypePlaceholder: placeholderMap[field.attribute.name] ?? ''
                }
            }
        });
    }

    // Push remaining fields
    for (const f of $formFieldStates) {
        if (!desiredOrder.includes(f.attribute.name)) rest.push(f);
    }

    return [...ordered, ...rest];
});


</script>
<div class="grid grid-cols-1 md:grid-cols-1 gap-x-4">
  <div class="flex flex-col md:flex-row md:space-x-4">
  {#each $sortedFormFieldStates.filter(f => f.attribute.name === 'firstName' || f.attribute.name === 'lastName') as formFieldState, i (i)}
  {@const { attribute, valueOrValues } = formFieldState}
  
  <div class="flex-1">
    <GroupLabel {attribute} {groupNameRef} {i18n} {kcClsx} />
    <div class="flex-1 w-full">
    <div
      class={kcClsx('kcFormGroupClass')}
      style:display={attribute.annotations.inputType === 'hidden' ? 'none' : undefined}
    >
      <div class={kcClsx('kcLabelWrapperClass')}>
        <label for={attribute.name} class={kcClsx('kcLabelClass')}>
          {@render advancedMsg(attribute.displayName ?? '')()}
        </label>
        {#if attribute.required}{/if}
      </div>
     <div class={kcClsx('kcInputWrapperClass')}>
        <InputFieldByType
          {attribute}
          {valueOrValues}
          displayableErrors={$displayableErrors[i]}
          {dispatchFormAction}
          {kcClsx}
          {i18n}
          
        />
        <FieldErrors
          {attribute}
          bind:displayableErrors={$displayableErrors[i]}
          {kcClsx}
        />
      </div>
    </div>
    </div>
  </div>
{/each}
  </div>
{#each $sortedFormFieldStates.filter(f => f.attribute.name !== 'firstName' && f.attribute.name !== 'lastName') as formFieldState, i (i)}
  {@const { attribute, valueOrValues } = formFieldState}
  {#if attribute.name !== 'username'}
    <GroupLabel {attribute} {groupNameRef} {i18n} {kcClsx} />
  {/if}
  <div
    class={kcClsx('kcFormGroupClass')}
    style:display={
      attribute.annotations.inputType === 'hidden' ||
      attribute.name === 'username' ||
      (attribute.name === 'password-confirm' && !doMakeUserConfirmPassword)
        ? 'none'
        : undefined
    }
  >
    <div class={kcClsx('kcLabelWrapperClass')}>
      <label
        for={attribute.name}
        class={kcClsx('kcLabelClass')}
      >
        {@render advancedMsg(attribute.displayName ?? '')()}
      </label>
      {#if attribute.required}
        
      {/if}
    </div>
    <div class={kcClsx('kcInputWrapperClass')}>
      {#if attribute.annotations.inputHelperTextBefore !== undefined}
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
        displayableErrors={$displayableErrors[i]}
        {dispatchFormAction}
        {kcClsx}
        {i18n}
      />
      <FieldErrors
        {attribute}
        bind:displayableErrors={$displayableErrors[i]}
        {kcClsx}
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

      {#if afterField}
        {@render afterField({
          attribute,
          dispatchFormAction,
          displayableErrors: $displayableErrors[i],
          valueOrValues,
          kcClsx,
          i18n,
        })}
      {/if}
      <!-- NOTE: Downloading of html5DataAnnotations scripts is done in the useUserProfileForm hook -->
    </div>
  </div>
{/each}
</div>


