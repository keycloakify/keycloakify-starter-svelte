<script lang="ts">
  import { assert } from 'tsafe/assert';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import type { InputFieldByTypeProps } from './InputFieldByTypeProps';
  import InputLabel from './InputLabel.svelte';

  const { attribute, dispatchFormAction, valueOrValues, displayableErrors }: InputFieldByTypeProps = $props();

  const { kcClsx } = useKcClsx();
  const { classDiv, classInput, classLabel, inputType } = (() => {
    const { inputType } = attribute.annotations;

    assert(inputType === 'select-radiobuttons' || inputType === 'multiselect-checkboxes');

    switch (inputType) {
      case 'select-radiobuttons':
        return {
          inputType: 'radio',
          classDiv: kcClsx('kcInputClassRadio'),
          classInput: kcClsx('kcInputClassRadioInput'),
          classLabel: kcClsx('kcInputClassRadioLabel'),
        };
      case 'multiselect-checkboxes':
        return {
          inputType: 'checkbox',
          classDiv: kcClsx('kcInputClassCheckbox'),
          classInput: kcClsx('kcInputClassCheckboxInput'),
          classLabel: kcClsx('kcInputClassCheckboxLabel'),
        };
      default:
        return {
          inputType: '',
          classDiv: '',
          classInput: '',
          classLabel: '',
        };
    }
  })();

  const options = (() => {
    walk: {
      const { inputOptionsFromValidation } = attribute.annotations;

      if (inputOptionsFromValidation === undefined) {
        break walk;
      }

      const validator = (attribute.validators as Record<string, { options?: string[] }>)[inputOptionsFromValidation];

      if (validator === undefined) {
        break walk;
      }

      if (validator.options === undefined) {
        break walk;
      }

      return validator.options;
    }

    return attribute.validators.options?.options ?? [];
  })();
</script>

{#each options as option (option)}
  <div class={classDiv}>
    <input
      type={inputType}
      id={`${attribute.name}-${option}`}
      name={attribute.name}
      value={option}
      class={classInput}
      aria-invalid={displayableErrors.length !== 0}
      disabled={attribute.readOnly}
      checked={valueOrValues instanceof Array ? valueOrValues.includes(option) : valueOrValues === option}
      onchange={(event) =>
        dispatchFormAction('formAction', {
          action: 'update',
          name: attribute.name,
          valueOrValues: (() => {
            const isChecked = (event.target as HTMLInputElement).checked;

            if (valueOrValues instanceof Array) {
              const newValues = [...valueOrValues];

              if (isChecked) {
                newValues.push(option);
              } else {
                newValues.splice(newValues.indexOf(option), 1);
              }

              return newValues;
            }

            return (event.target as HTMLInputElement).checked ? option : '';
          })(),
        })}
      onblur={() =>
        dispatchFormAction('formAction', {
          action: 'focus lost',
          name: attribute.name,
          fieldIndex: undefined,
        })}
    />
    <label
      for={`${attribute.name}-${option}`}
      class={`${classLabel}${attribute.readOnly ? ` ${kcClsx('kcInputClassRadioCheckboxLabelDisabled')}` : ''}`}
    >
      <InputLabel
        {attribute}
        {option}
      ></InputLabel>
    </label>
  </div>
{/each}
