<script lang="ts">
  import type { Snippet } from 'svelte';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import ErrorIcon from './ErrorIcon.svelte';
  import { Group } from './Group';

  export type Props = {
    className?: string;
    label: Snippet;
    required?: boolean;
    error?: Snippet;
    renderInput: (inputProps: { type: 'text'; id: string; 'aria-invalid': true | undefined }) => Snippet;
  };
  const id = $props.id();
  const {
    className,
    label,
    required = false,
    //autoComplete = "off",
    error,
    renderInput,
  }: Props = $props();

  const { kcClsx } = useKcClsx();

  const inputId = `input-${id}`;
</script>

<Group
  {className}
  {inputId}
  {label}
  {error}
  {required}
>
  <span class={kcClsx('kcInputClass', !!error && 'kcError')}>
    {@render renderInput({
      type: 'text',
      id: inputId,
      'aria-invalid': error ? true : undefined,
    })()}
  </span>

  {#if !!error}
    <ErrorIcon />
  {/if}
</Group>
