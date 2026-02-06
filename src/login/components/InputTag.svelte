<script lang="ts">
  import AddRemoveButtonsMultiValuedAttribute from './AddRemoveButtonsMultiValuedAttribute.svelte';
  import FieldErrors from './FieldErrors.svelte';
  import type { InputFieldByTypeProps } from '@keycloakify/svelte/login/components/InputFieldByTypeProps';
  import { assert } from 'keycloakify/tools/assert';
  import type { I18n } from '../i18n';

  type InputTagProps = InputFieldByTypeProps<I18n> & { fieldIndex?: number };
  let {
    attribute,
    fieldIndex,
    kcClsx,
    dispatchFormAction,
    valueOrValues,
    i18n,
    displayableErrors = $bindable([]),
  }: InputTagProps = $props();

  const { advancedMsgStr } = $i18n;
  const { inputType } = attribute.annotations;
  let value = $state(
    (() => {
      if (fieldIndex !== undefined) {
        assert(valueOrValues instanceof Array);
        return valueOrValues[fieldIndex];
      }

      assert(typeof valueOrValues === 'string');

      return valueOrValues;
    })(),
  );
  const html5DataAnnotations = {
    ...Object.fromEntries(
      Object.entries(attribute.group?.html5DataAnnotations ?? {}).map(([key, value]) => [`data-${key}`, value]),
    ),
  };
</script>

<input
  type={inputType?.startsWith('html5-') ? inputType.slice(6) : (inputType ?? 'text')}
  id={attribute.name}
  name={attribute.name}
  bind:value
  class={kcClsx('kcInputClass')}
  aria-invalid={displayableErrors.find((error) => error.fieldIndex === fieldIndex) !== undefined}
  disabled={attribute.readOnly}
  autocomplete={attribute.autocomplete as 'on'}
  placeholder={attribute.annotations.inputTypePlaceholder === undefined
    ? undefined
    : advancedMsgStr(attribute.annotations.inputTypePlaceholder)}
  pattern={attribute.annotations.inputTypePattern}
  size={attribute.annotations.inputTypeSize === undefined
    ? undefined
    : parseInt(`${attribute.annotations.inputTypeSize}`)}
  maxlength={attribute.annotations.inputTypeMaxlength === undefined
    ? undefined
    : parseInt(`${attribute.annotations.inputTypeMaxlength}`)}
  minlength={attribute.annotations.inputTypeMinlength === undefined
    ? undefined
    : parseInt(`${attribute.annotations.inputTypeMinlength}`)}
  max={attribute.annotations.inputTypeMax}
  min={attribute.annotations.inputTypeMin}
  step={attribute.annotations.inputTypeStep}
  {...html5DataAnnotations}
  onchange={(event) =>
    dispatchFormAction('formAction', {
      action: 'update',
      name: attribute.name,
      valueOrValues: (() => {
        if (fieldIndex !== undefined) {
          assert(valueOrValues instanceof Array);

          return (valueOrValues as string[]).map((value, i) => {
            if (i === fieldIndex) {
              return event.currentTarget.value;
            }

            return value;
          });
        }

        return event.currentTarget.value;
      })(),
    })}
  onblur={() =>
    dispatchFormAction('formAction', {
      action: 'focus lost',
      name: attribute.name,
      fieldIndex: fieldIndex,
    })}
/>
{#if fieldIndex !== undefined && valueOrValues instanceof Array}
  {@const values = valueOrValues}
  <FieldErrors
    {attribute}
    {kcClsx}
    bind:displayableErrors
    {fieldIndex}
  ></FieldErrors>
  <AddRemoveButtonsMultiValuedAttribute
    {attribute}
    {values}
    {fieldIndex}
    {dispatchFormAction}
    {i18n}
  ></AddRemoveButtonsMultiValuedAttribute>
{/if}
