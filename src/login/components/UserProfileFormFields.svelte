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
    afterField,
  } = props;

  const { advancedMsg, msgStr } = $i18n;

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

  const groupNameRef = { current: '' };
  const formFieldStates = derived(formState, ($formState) => $formState.formFieldStates);



  const desiredOrder = ['firstName', 'lastName', 'email', 'password'];
  
  const sortedFormFieldStates = derived(formFieldStates, ($formFieldStates) => {
    const ordered: typeof $formFieldStates = [];
    const rest: typeof $formFieldStates = [];

    for (const name of desiredOrder) {
        const field = $formFieldStates.find(f => f.attribute.name === name);
        if (field) {
            const pKey = `${field.attribute.name}.placeholder`;
            // DELETED: const lKey was removed from here

            ordered.push({
                ...field,
                attribute: {
                    ...field.attribute,
                    displayName: field.attribute.name === 'email' ? msgStr('email.label' as any) : field.attribute.displayName,
                    annotations: {
                        ...field.attribute.annotations,
                        inputTypePlaceholder: field.attribute.name === 'password' 
                            ? msgStr('password.placeholder.register') 
                            : msgStr(pKey as any)
                    }
                }
            });
        }
    }

    for (const f of $formFieldStates) {
        if (!desiredOrder.includes(f.attribute.name)) rest.push(f);
    }

    return [...ordered, ...rest];
  });
</script>
<div class="grid grid-cols-1 md:grid-cols-1 gap-x-4">
  <div class="flex flex-col md:flex-row md:space-x-4">
  {#each $sortedFormFieldStates.filter(f => f.attribute.name === 'firstName' || f.attribute.name === 'lastName') as formFieldState (formFieldState.attribute.name)}
    {@const { attribute, valueOrValues, displayableErrors: fieldErrors } = formFieldState}
    <div class="flex-1">
        <GroupLabel {attribute} {groupNameRef} {i18n} {kcClsx} />
        <div class={kcClsx('kcFormGroupClass')} style:display={attribute.annotations.inputType === 'hidden' ? 'none' : undefined}>
            <div class={kcClsx('kcLabelWrapperClass')}>
                <label for={attribute.name} class={kcClsx('kcLabelClass')}>
                    {@render advancedMsg(attribute.displayName ?? '')()}
                </label>
            </div>
            <div class={kcClsx('kcInputWrapperClass')}>
                <InputFieldByType {attribute} {valueOrValues} displayableErrors={fieldErrors} {dispatchFormAction} {kcClsx} {i18n} />
                <FieldErrors {attribute} displayableErrors={fieldErrors} {kcClsx} />

                {#if afterField}
                    {@render afterField({ attribute, dispatchFormAction, displayableErrors: fieldErrors, valueOrValues, kcClsx, i18n })}
                {/if}
            </div>
        </div>
    </div>
{/each}
  </div>
{#each $sortedFormFieldStates.filter(f => f.attribute.name !== 'firstName' && f.attribute.name !== 'lastName') as formFieldState (formFieldState.attribute.name)}
    {@const { attribute, valueOrValues, displayableErrors: fieldErrors } = formFieldState}
    {#if attribute.name !== 'username'}
      <GroupLabel {attribute} {groupNameRef} {i18n} {kcClsx} />
    {/if}
    <div class={kcClsx('kcFormGroupClass')} style:display={attribute.annotations.inputType === 'hidden' || attribute.name === 'username' || (attribute.name === 'password-confirm' && !doMakeUserConfirmPassword) ? 'none' : undefined}>
      <div class={kcClsx('kcLabelWrapperClass')}>
        <label for={attribute.name} class={kcClsx('kcLabelClass')}>
          {@render advancedMsg(attribute.displayName ?? '')()}
        </label>
      </div>
      <div class={kcClsx('kcInputWrapperClass')}>
        <InputFieldByType {attribute} {valueOrValues} displayableErrors={fieldErrors} {dispatchFormAction} {kcClsx} {i18n} />
        <FieldErrors {attribute} displayableErrors={fieldErrors} {kcClsx} />
        
        {#if afterField}
          {@render afterField({ attribute, dispatchFormAction, displayableErrors: fieldErrors, valueOrValues, kcClsx, i18n })}
        {/if}
      </div>
    </div>
  {/each}
</div>


