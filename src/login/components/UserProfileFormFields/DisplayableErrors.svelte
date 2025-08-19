<script lang="ts">
  import type { FormFieldError } from '../../../@keycloakify/login-ui-svelte/useUserProfileForm';

  type Props = {
    displayableErrors: FormFieldError[];
    fieldIndex?: number;
  };
  const props: Props = $props();
  const { fieldIndex } = props;

  const displayableErrors = props.displayableErrors.filter((error) => error.fieldIndex === fieldIndex);
</script>

{#each displayableErrors as { errorMessage }, i (i)}
  {@render errorMessage()}
  {#if displayableErrors.length - 1 !== i}
    <br />
  {/if}
{/each}
