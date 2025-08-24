<script
  context="module"
  lang="ts"
>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { Attribute } from '../../../@keycloakify/login-ui-svelte/useUserProfileForm';
  import KcPageStory, { type KcPageStoryProps } from '../../mocks/KcPageStory.svelte';

  const args: KcPageStoryProps = { pageId: 'register.ftl' };
  const { Story } = defineMeta({
    title: 'login/register.ftl',
    component: KcPageStory,
    args: args,
  });
</script>

<Story name="Default" />

<!--  -->
<Story
  name="WithEmailAlreadyExists"
  args={{
    ...args,
    kcContext: {
      profile: {
        attributesByName: {
          username: {
            value: 'johndoe',
          },
          email: {
            value: 'jhon.doe@gmail.com',
          },
          firstName: {
            value: 'John',
          },
          lastName: {
            value: 'Doe',
          },
        },
      },
      messagesPerField: {
        // NOTE: The other functions of messagesPerField are derived from get() and
        // existsError() so they are the only ones that need to mock.
        existsError: (fieldName: string, ...otherFieldNames: string[]) =>
          [fieldName, ...otherFieldNames].includes('email'),
        get: (fieldName: string) => (fieldName === 'email' ? 'Email already exists.' : undefined),
      },
    },
  }}
/>

<!--  -->
<Story
  name="WithRestrictedToMITStudents"
  args={{
    ...args,
    kcContext: {
      profile: {
        attributesByName: {
          email: {
            validators: {
              pattern: {
                pattern: '^[^@]+@([^.]+\\.)*((mit\\.edu)|(berkeley\\.edu))$',
                'error-message': '${profile.attributes.email.pattern.error}',
              },
            },
            annotations: {
              inputHelperTextBefore: '${profile.attributes.email.inputHelperTextBefore}',
            },
          },
        },
      },
      'x-keycloakify': {
        messages: {
          'profile.attributes.email.inputHelperTextBefore': 'Please use your MIT or Berkeley email.',
          'profile.attributes.email.pattern.error':
            'This is not an MIT (<strong>@mit.edu</strong>) nor a Berkeley (<strong>@berkeley.edu</strong>) email.',
        },
      },
    },
  }}
/>

<!--  -->
<Story
  name="WithFavoritePet"
  args={{
    ...args,
    kcContext: {
      profile: {
        attributesByName: {
          favoritePet: {
            name: 'favorite-pet',
            displayName: '${profile.attributes.favoritePet}',
            validators: {
              options: {
                options: ['cat', 'dog', 'fish'],
              },
            },
            annotations: {
              inputOptionLabelsI18nPrefix: 'profile.attributes.favoritePet.options',
            },
            required: false,
            readOnly: false,
          } satisfies Attribute,
        },
      },
      'x-keycloakify': {
        messages: {
          'profile.attributes.favoritePet': 'Favorite Pet',
          'profile.attributes.favoritePet.options.cat': 'Fluffy Cat',
          'profile.attributes.favoritePet.options.dog': 'Loyal Dog',
          'profile.attributes.favoritePet.options.fish': 'Peaceful Fish',
        },
      },
    },
  }}
/>

<!--  -->
<Story
  name="WithNewsletter"
  args={{
    ...args,
    kcContext: {
      profile: {
        attributesByName: {
          newsletter: {
            name: 'newsletter',
            displayName: 'Sign up to the newsletter',
            validators: {
              options: {
                options: ['yes'],
              },
            },
            annotations: {
              inputOptionLabels: {
                yes: 'I want my email inbox filled with spam',
              },
              inputType: 'multiselect-checkboxes',
            },
            required: false,
            readOnly: false,
          } satisfies Attribute,
        },
      },
    },
  }}
/>

<!--  -->
<Story
  name="WithEmailAsUsername"
  args={{
    ...args,
    kcContext: {
      realm: {
        registrationEmailAsUsername: true,
      },
      profile: {
        attributesByName: {
          username: undefined,
        },
      },
    },
  }}
/>

<!--  -->
<Story
  name="WithRecaptcha"
  args={{
    ...args,
    kcContext: {
      scripts: ['https://www.google.com/recaptcha/api.js?hl=en'],
      recaptchaRequired: true,
      recaptchaSiteKey: '6LfQHvApAAAAAE73SYTd5vS0lB1Xr7zdiQ-6iBVa',
    },
  }}
/>

<!--  -->
<Story
  name="WithRecaptchaFrench"
  args={{
    ...args,
    kcContext: {
      locale: {
        currentLanguageTag: 'fr',
      },
      scripts: ['https://www.google.com/recaptcha/api.js?hl=fr'],
      recaptchaRequired: true,
      recaptchaSiteKey: '6LfQHvApAAAAAE73SYTd5vS0lB1Xr7zdiQ-6iBVa',
    },
  }}
/>

<!--  -->
<Story
  name="WithPasswordMinLength8"
  args={{
    ...args,
    kcContext: {
      passwordPolicies: {
        length: 8,
      },
    },
  }}
/>

<!--  -->
<Story
  name="WithTermsAcceptance"
  args={{
    ...args,
    kcContext: {
      termsAcceptanceRequired: true,
      'x-keycloakify': {
        messages: {
          termsText: "<a href='https://example.com/terms'>Service Terms of Use</a>",
        },
      },
    },
  }}
/>

<!--  -->
<Story
  name="WithTermsNotAccepted"
  args={{
    ...args,
    kcContext: {
      termsAcceptanceRequired: true,
      messagesPerField: {
        existsError: (fieldName: string) => fieldName === 'termsAccepted',
        get: (fieldName: string) => (fieldName === 'termsAccepted' ? 'You must accept the terms.' : undefined),
      },
    },
  }}
/>

<!--  -->
<Story
  name="WithFieldErrors"
  args={{
    ...args,
    kcContext: {
      profile: {
        attributesByName: {
          username: { value: '' },
          email: { value: 'invalid-email' },
        },
      },
      messagesPerField: {
        existsError: (fieldName: string) => ['username', 'email'].includes(fieldName),
        get: (fieldName: string) => {
          if (fieldName === 'username') return 'Username is required.';
          if (fieldName === 'email') return 'Invalid email format.';
        },
      },
    },
  }}
/>

<!--  -->
<Story
  name="WithReadOnlyFields"
  args={{
    ...args,
    kcContext: {
      profile: {
        attributesByName: {
          username: { value: 'johndoe', readOnly: true },
          email: { value: 'jhon.doe@gmail.com', readOnly: false },
        },
      },
    },
  }}
/>

<!--  -->
<Story
  name="WithAutoGeneratedUsername"
  args={{
    ...args,
    kcContext: {
      profile: {
        attributesByName: {
          username: { value: 'autogenerated_username' },
        },
      },
    },
  }}
/>
