import { createRawSnippet, onMount, type Snippet } from 'svelte';
import type { Readable } from 'svelte/store';
import { assert } from 'tsafe/assert';
import { useState } from '../../../../@keycloakify/login-ui-svelte/tools/useState';
import { useKcContext } from '../../../KcContext.gen';

type Recaptcha = {
  isIAmNotARobotChecked: Readable<boolean>;
  iAmNotARobotPlaceholder: Snippet;
};

const RECAPTCHA_CALLBACK_FUNCTION_NAMES = {
  SUCCESS: 'onRecaptchaSuccess',
  EXPIRED: 'onRecaptchaExpired',
};

export function useIAmNotARobotRecaptchaIfEnabled(params: {
  iAmNotARobotSize: 'compact' | 'large';
}): Recaptcha | undefined {
  const { iAmNotARobotSize } = params;

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'register.ftl');

  const isEnabled = kcContext.recaptchaRequired && kcContext.recaptchaVisible;

  const [isIAmNotARobotChecked, setIsIAmNotARobotChecked] = useState(false);

  onMount(() => {
    if (!isEnabled) {
      return;
    }

    Object.assign(window, {
      [RECAPTCHA_CALLBACK_FUNCTION_NAMES.SUCCESS]: () => {
        setIsIAmNotARobotChecked(true);
      },
      [RECAPTCHA_CALLBACK_FUNCTION_NAMES.EXPIRED]: () => {
        setIsIAmNotARobotChecked(false);
      },
    });

    return () => {
      Object.values(RECAPTCHA_CALLBACK_FUNCTION_NAMES).forEach((functionName) => {
        //@ts-expect-error: We know what we are doing
        delete window[functionName];
      });
    };
  });

  if (!isEnabled) {
    return undefined;
  }

  assert(kcContext.recaptchaSiteKey !== undefined);

  return {
    isIAmNotARobotChecked,
    iAmNotARobotPlaceholder: createRawSnippet(() => ({
      render: () => {
        return `<div
  class="g-recaptcha"
  data-size="${iAmNotARobotSize}"
  data-callback="${RECAPTCHA_CALLBACK_FUNCTION_NAMES.SUCCESS}"
  data-expired-callback="${RECAPTCHA_CALLBACK_FUNCTION_NAMES.EXPIRED}"
  data-sitekey="${kcContext.recaptchaSiteKey}"
  data-action="${kcContext.recaptchaAction}"
></div>`;
      },
    })),
  };
}
