<script lang="ts">
  import { assert } from 'tsafe/assert';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import type { InputFieldByTypeProps } from './InputFieldByTypeProps';

  const { attribute, dispatchFormAction, displayableErrors, valueOrValues }: InputFieldByTypeProps = $props();

  const { kcClsx } = useKcClsx();

  assert(typeof valueOrValues === 'string');

  const value = valueOrValues;
</script>

<span class={kcClsx('kcInputClass')}>
  <textarea
    id={attribute.name}
    name={attribute.name}
    class={kcClsx('kcInputClass')}
    aria-invalid={displayableErrors.length !== 0}
    disabled={attribute.readOnly}
    cols={attribute.annotations.inputTypeCols === undefined
      ? undefined
      : parseInt(`${attribute.annotations.inputTypeCols}`)}
    rows={attribute.annotations.inputTypeRows === undefined
      ? undefined
      : parseInt(`${attribute.annotations.inputTypeRows}`)}
    maxlength={attribute.annotations.inputTypeMaxlength === undefined
      ? undefined
      : parseInt(`${attribute.annotations.inputTypeMaxlength}`)}
    {value}
    onchange={(event) =>
      dispatchFormAction('formAction', {
        action: 'update',
        name: attribute.name,
        valueOrValues: (event.target as HTMLTextAreaElement).value,
      })}
    onblur={() =>
      dispatchFormAction('formAction', {
        action: 'focus lost',
        name: attribute.name,
        fieldIndex: undefined,
      })}
  ></textarea>
</span>
