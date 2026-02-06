<script
  context="module"
  lang="ts"
>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { KcPageStoryProps } from '../KcPageStory';
  import KcPageStory from '../KcPageStory.svelte';

  const args: KcPageStoryProps = { pageId: 'login-password.ftl' };
  const { Story } = defineMeta({
    title: 'login/login-password.ftl',
    component: KcPageStory,
    args: args,
  });
</script>

<Story name="Default" />

<!-- /**
 * WithPasswordError:
 * - Purpose: Tests the behavior when an error occurs in the password field (e.g., incorrect password).
 * - Scenario: Simulates a scenario where an invalid password is entered, and an error message is displayed.
 * - Key Aspect: Ensures that the password input field displays error messages correctly.
 */ -->
<Story
  name="WithPasswordError"
  args={{
    ...args,
    kcContext: {
      realm: {
        resetPasswordAllowed: true,
      },
      url: {
        loginAction: '/mock-login',
        loginResetCredentialsUrl: '/mock-reset-password',
      },
      messagesPerField: {
        existsError: (field: string) => field === 'password',
        get: () => 'Invalid password',
      },
    },
  }}
/>

<!-- /**
 * WithoutResetPasswordOption:
 * - Purpose: Tests the behavior when the reset password option is disabled.
 * - Scenario: Simulates a scenario where the `resetPasswordAllowed` is set to `false`, and the "Forgot Password" link is not rendered.
 * - Key Aspect: Ensures that the component handles cases where resetting the password is not allowed.
 */ -->
<Story
  name="WithoutResetPasswordOption"
  args={{
    ...args,
    kcContext: {
      realm: {
        resetPasswordAllowed: false,
      },
      url: {
        loginAction: '/mock-login',
        loginResetCredentialsUrl: '/mock-reset-password',
      },
      messagesPerField: {
        existsError: () => false,
      },
    },
  }}
/>
