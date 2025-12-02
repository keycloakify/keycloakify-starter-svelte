<script lang="ts">
  import { assert } from 'tsafe/assert';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import type { InputFieldByTypeProps } from './InputFieldByTypeProps';
  import InputLabel from './InputLabel.svelte';

  const { attribute, dispatchFormAction, displayableErrors, valueOrValues }: InputFieldByTypeProps = $props();

  const { kcClsx } = useKcClsx();
  const isMultiple = attribute.annotations.inputType === 'multiselect';
  const options = (() => {
    walk: {
      const { inputOptionsFromValidation } = attribute.annotations;

      if (inputOptionsFromValidation === undefined) {
        break walk;
      }

      assert(typeof inputOptionsFromValidation === 'string');

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

<div class={kcClsx('kcInputClass')}>
  <select
    id={attribute.name}
    name={attribute.name}
    class={kcClsx('kcInputClass')}
    aria-invalid={displayableErrors.length !== 0}
    disabled={attribute.readOnly}
    multiple={isMultiple}
    size={attribute.annotations.inputTypeSize === undefined
      ? undefined
      : parseInt(`${attribute.annotations.inputTypeSize}`)}
    value={valueOrValues}
    onchange={(event) =>
      dispatchFormAction('formAction', {
        action: 'update',
        name: attribute.name,
        valueOrValues: (() => {
          if (isMultiple) {
            return Array.from((event.target as HTMLSelectElement).selectedOptions).map((option) => option.value);
          }

          return (event.target as HTMLSelectElement).value;
        })(),
      })}
    onblur={() =>
      dispatchFormAction('formAction', {
        action: 'focus lost',
        name: attribute.name,
        fieldIndex: undefined,
      })}
  >
    {#if !isMultiple}<option value=""></option>{/if}
    {#each options as option (option)}
      <option value={option}>
        <InputLabel
          {attribute}
          {option}
        ></InputLabel>
      </option>
    {/each}
  </select>
  <span class={kcClsx('kcFormControlUtilClass')}>
    <span class={kcClsx('kcFormControlToggleIcon')}>
      <svg
        class="pf-v5-svg"
        viewBox="0 0 320 512"
        fill="currentColor"
        aria-hidden="true"
        role="img"
        width="1em"
        height="1em"
      >
        <path
          d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
        ></path>
      </svg>
    </span>
  </span>˚
</div>
