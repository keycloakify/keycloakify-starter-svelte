<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes } from 'svelte/elements';
  import { useReducer } from '../../@keycloakify/login-ui-svelte/tools/useReducer';

  const props: HTMLAnchorAttributes & {
    renderLink: Snippet<[{ anchorProps: HTMLAnchorAttributes; isDisabled: boolean }]>;
  } = $props();
  const { renderLink, ...anchorProps } = props;

  const [hasBeenClicked, setClicked] = useReducer(() => true, false);
</script>

{@render renderLink({
  anchorProps: {
    ...anchorProps,
    'aria-disabled': !$hasBeenClicked ? anchorProps['aria-disabled'] : true,
    role: !$hasBeenClicked ? anchorProps.role : 'link',
    href: !$hasBeenClicked ? anchorProps.href : '#',
    onclick: !$hasBeenClicked
      ? (e) => {
          setClicked();
          return anchorProps.onclick?.(e);
        }
      : undefined,
  },
  isDisabled: $hasBeenClicked,
})}
