<script lang="ts">
  import type { FullAutoFill, HTMLInputAttributes } from 'svelte/elements';
  import { assert } from 'tsafe/assert';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import { useI18n } from '../../i18n';
  import ErrorContainer from '../field/Group/ErrorContainer.svelte';
  import AddRemoveButtonsMultiValuedAttribute from './AddRemoveButtonsMultiValuedAttribute.svelte';
  import DisplayableErrors from './DisplayableErrors.svelte';
  import type { InputFieldByTypeProps } from './InputFieldByTypeProps';

  type InputTagProps = InputFieldByTypeProps & { fieldIndex?: number };
  let { attribute, fieldIndex, dispatchFormAction, valueOrValues, displayableErrors }: InputTagProps = $props();

  const { advancedMsgStr } = useI18n();
  const { kcClsx } = useKcClsx();

  const inputProps = {
    type: (() => {
      const { inputType } = attribute.annotations;

      if (inputType?.startsWith('html5-')) {
        return inputType.slice(6);
      }

      return inputType ?? 'text';
    })(),
    id: attribute.name,
    name: attribute.name,
    value: (() => {
      if (fieldIndex !== undefined) {
        assert(valueOrValues instanceof Array);
        return valueOrValues[fieldIndex];
      }

      assert(typeof valueOrValues === 'string');

      return valueOrValues;
    })(),
    class: kcClsx('kcInputClass'),
    'aria-invalid': displayableErrors.find((error) => error.fieldIndex === fieldIndex) !== undefined,
    disabled: attribute.readOnly,
    autocomplete: attribute.autocomplete as FullAutoFill,
    placeholder:
      attribute.annotations.inputTypePlaceholder === undefined
        ? undefined
        : advancedMsgStr(attribute.annotations.inputTypePlaceholder),
    pattern: attribute.annotations.inputTypePattern,
    size:
      attribute.annotations.inputTypeSize === undefined
        ? undefined
        : parseInt(`${attribute.annotations.inputTypeSize}`),
    maxlength:
      attribute.annotations.inputTypeMaxlength === undefined
        ? undefined
        : parseInt(`${attribute.annotations.inputTypeMaxlength}`),
    minlength:
      attribute.annotations.inputTypeMinlength === undefined
        ? undefined
        : parseInt(`${attribute.annotations.inputTypeMinlength}`),
    max: attribute.annotations.inputTypeMax,
    min: attribute.annotations.inputTypeMin,
    step: attribute.annotations.inputTypeStep,
    ...Object.fromEntries(
      Object.entries(attribute.html5DataAnnotations ?? {}).map(([key, value]) => [`data-${key}`, value]),
    ),
    onchange: (event) =>
      dispatchFormAction('formAction', {
        action: 'update',
        name: attribute.name,
        valueOrValues: (() => {
          if (fieldIndex !== undefined) {
            assert(valueOrValues instanceof Array);

            return valueOrValues.map((value, i) => {
              if (i === fieldIndex) {
                return (event.target as HTMLInputElement).value;
              }

              return value;
            });
          }

          return (event.target as HTMLInputElement).value;
        })(),
      }),

    onblur: () =>
      dispatchFormAction('formAction', {
        action: 'focus lost',
        name: attribute.name,
        fieldIndex: fieldIndex,
      }),
  } satisfies HTMLInputAttributes;
</script>

<span class={kcClsx('kcInputClass', inputProps['aria-invalid'] && 'kcError')}>
  <input {...inputProps} />
</span>

{#if fieldIndex !== undefined && valueOrValues instanceof Array}
  {@const values = valueOrValues}
  <ErrorContainer>
    <DisplayableErrors
      {displayableErrors}
      {fieldIndex}
    />
  </ErrorContainer>
  <AddRemoveButtonsMultiValuedAttribute
    {attribute}
    {values}
    {fieldIndex}
    {dispatchFormAction}
  ></AddRemoveButtonsMultiValuedAttribute>
{/if}
