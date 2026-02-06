<script
  context="module"
  lang="ts"
>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { KcPageStoryProps } from '../KcPageStory';
  import KcPageStory from '../KcPageStory.svelte';

  const args: KcPageStoryProps = { pageId: 'login.ftl' };
  const { Story } = defineMeta({
    title: 'login/login.ftl',
    component: KcPageStory,
    args: args,
  });
</script>

<Story name="Default" />

<!--  -->
<Story
  name="WithInvalidCredential"
  args={{
    ...args,
    kcContext: {
      login: {
        username: 'johndoe',
      },
      messagesPerField: {
        // NOTE: The other functions of messagesPerField are derived from get() and
        // existsError() so they are the only ones that need to mock.
        existsError: (fieldName: string, ...otherFieldNames: string[]) => {
          const fieldNames = [fieldName, ...otherFieldNames];
          return fieldNames.includes('username') || fieldNames.includes('password');
        },
        get: (fieldName: string) => {
          if (fieldName === 'username' || fieldName === 'password') {
            return 'Invalid username or password.';
          }
          return '';
        },
      },
    },
  }}
/>

<!--  -->
<Story
  name="WithoutRegistration"
  args={{
    ...args,
    kcContext: {
      realm: { registrationAllowed: false },
    },
  }}
/>

<!--  -->
<Story
  name="WithoutRememberMe"
  args={{
    ...args,
    kcContext: {
      realm: { rememberMe: false },
    },
  }}
/>

<!--  -->
<Story
  name="WithoutPasswordReset"
  args={{
    ...args,
    kcContext: {
      realm: { resetPasswordAllowed: false },
    },
  }}
/>

<!--  -->
<Story
  name="WithEmailAsUsername"
  args={{
    ...args,
    kcContext: {
      realm: { loginWithEmailAllowed: false },
    },
  }}
/>

<!--  -->
<Story
  name="WithPresetUsername"
  args={{
    ...args,
    kcContext: {
      login: { username: 'max.mustermann@mail.com' },
    },
  }}
/>

<!--  -->
<Story
  name="WithImmutablePresetUsername"
  args={{
    ...args,
    kcContext: {
      auth: {
        attemptedUsername: 'max.mustermann@mail.com',
        showUsername: true,
      },
      usernameHidden: true,
      message: {
        type: 'info',
        summary: 'Please re-authenticate to continue',
      },
    },
  }}
/>

<!--  -->
<Story
  name="WithSocialProviders"
  args={{
    ...args,
    kcContext: {
      social: {
        displayInfo: true,
        providers: [
          {
            loginUrl: 'google',
            alias: 'google',
            providerId: 'google',
            displayName: 'Google',
            iconClasses: 'fa fa-google',
          },
          {
            loginUrl: 'microsoft',
            alias: 'microsoft',
            providerId: 'microsoft',
            displayName: 'Microsoft',
            iconClasses: 'fa fa-windows',
          },
          {
            loginUrl: 'facebook',
            alias: 'facebook',
            providerId: 'facebook',
            displayName: 'Facebook',
            iconClasses: 'fa fa-facebook',
          },
          {
            loginUrl: 'instagram',
            alias: 'instagram',
            providerId: 'instagram',
            displayName: 'Instagram',
            iconClasses: 'fa fa-instagram',
          },
          {
            loginUrl: 'twitter',
            alias: 'twitter',
            providerId: 'twitter',
            displayName: 'Twitter',
            iconClasses: 'fa fa-twitter',
          },
          {
            loginUrl: 'linkedin',
            alias: 'linkedin',
            providerId: 'linkedin',
            displayName: 'LinkedIn',
            iconClasses: 'fa fa-linkedin',
          },
          {
            loginUrl: 'stackoverflow',
            alias: 'stackoverflow',
            providerId: 'stackoverflow',
            displayName: 'Stackoverflow',
            iconClasses: 'fa fa-stack-overflow',
          },
          {
            loginUrl: 'github',
            alias: 'github',
            providerId: 'github',
            displayName: 'Github',
            iconClasses: 'fa fa-github',
          },
          {
            loginUrl: 'gitlab',
            alias: 'gitlab',
            providerId: 'gitlab',
            displayName: 'Gitlab',
            iconClasses: 'fa fa-gitlab',
          },
          {
            loginUrl: 'bitbucket',
            alias: 'bitbucket',
            providerId: 'bitbucket',
            displayName: 'Bitbucket',
            iconClasses: 'fa fa-bitbucket',
          },
          {
            loginUrl: 'paypal',
            alias: 'paypal',
            providerId: 'paypal',
            displayName: 'PayPal',
            iconClasses: 'fa fa-paypal',
          },
          {
            loginUrl: 'openshift',
            alias: 'openshift',
            providerId: 'openshift',
            displayName: 'OpenShift',
            iconClasses: 'fa fa-cloud',
          },
        ],
      },
    },
  }}
/>

<!--  -->
<Story
  name="WithoutPasswordField"
  args={{
    ...args,
    kcContext: {
      realm: { password: false },
    },
  }}
/>

<!--  -->
<Story
  name="WithErrorMessage"
  args={{
    ...args,
    kcContext: {
      message: {
        summary:
          'The time allotted for the connection has elapsed.<br/>The login process will restart from the beginning.',
        type: 'error',
      },
    },
  }}
/>

<!--  -->
<Story
  name="WithOneSocialProvider"
  args={{
    ...args,
    kcContext: {
      social: {
        displayInfo: true,
        providers: [
          {
            loginUrl: 'google',
            alias: 'google',
            providerId: 'google',
            displayName: 'Google',
            iconClasses: 'fa fa-google',
          },
        ],
      },
    },
  }}
/>

<!--  -->
<Story
  name="WithTwoSocialProviders"
  args={{
    ...args,
    kcContext: {
      social: {
        displayInfo: true,
        providers: [
          {
            loginUrl: 'google',
            alias: 'google',
            providerId: 'google',
            displayName: 'Google',
            iconClasses: 'fa fa-google',
          },
          {
            loginUrl: 'microsoft',
            alias: 'microsoft',
            providerId: 'microsoft',
            displayName: 'Microsoft',
            iconClasses: 'fa fa-windows',
          },
        ],
      },
    },
  }}
/>

<!--  -->
<Story
  name="WithNoSocialProviders"
  args={{
    ...args,
    kcContext: {
      social: {
        displayInfo: true,
        providers: [],
      },
    },
  }}
/>

<!--  -->
<Story
  name="WithMoreThanTwoSocialProviders"
  args={{
    ...args,
    kcContext: {
      social: {
        displayInfo: true,
        providers: [
          {
            loginUrl: 'google',
            alias: 'google',
            providerId: 'google',
            displayName: 'Google',
            iconClasses: 'fa fa-google',
          },
          {
            loginUrl: 'microsoft',
            alias: 'microsoft',
            providerId: 'microsoft',
            displayName: 'Microsoft',
            iconClasses: 'fa fa-windows',
          },
          {
            loginUrl: 'facebook',
            alias: 'facebook',
            providerId: 'facebook',
            displayName: 'Facebook',
            iconClasses: 'fa fa-facebook',
          },
          {
            loginUrl: 'twitter',
            alias: 'twitter',
            providerId: 'twitter',
            displayName: 'Twitter',
            iconClasses: 'fa fa-twitter',
          },
        ],
      },
    },
  }}
/>

<!--  -->
<Story
  name="WithSocialProvidersAndWithoutRememberMe"
  args={{
    ...args,
    kcContext: {
      social: {
        displayInfo: true,
        providers: [
          {
            loginUrl: 'google',
            alias: 'google',
            providerId: 'google',
            displayName: 'Google',
            iconClasses: 'fa fa-google',
          },
        ],
      },
      realm: { rememberMe: false },
    },
  }}
/>
