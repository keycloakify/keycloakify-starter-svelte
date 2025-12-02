import type { Snippet } from 'svelte';
import type { Readable } from 'svelte/store';
import { useIAmNotARobotRecaptchaIfEnabled } from './useIAmNotARobotRecaptcha';
import { useInvisibleRecaptchaIfEnabled } from './useInvisibleRecaptcha';

type Recaptcha = {
  isIAmNotARobotChecked: Readable<boolean> | undefined;
  iAmNotARobotPlaceholder: Snippet | undefined;
  submitButtonProps:
    | {
        className: string;
        'data-sitekey': string;
        'data-callback': string;
        'data-action': string | undefined;
      }
    | undefined;
};

export function useRecaptchaIfEnabled(params: { iAmNotARobotSize: 'compact' | 'large' }): Recaptcha | undefined {
  const { iAmNotARobotSize } = params;

  const recaptcha_iAmNotARobot = useIAmNotARobotRecaptchaIfEnabled({ iAmNotARobotSize });
  const recaptcha_invisible = useInvisibleRecaptchaIfEnabled();

  if (recaptcha_iAmNotARobot === undefined && recaptcha_invisible === undefined) {
    return undefined;
  }

  return {
    isIAmNotARobotChecked: recaptcha_iAmNotARobot?.isIAmNotARobotChecked,
    iAmNotARobotPlaceholder: recaptcha_iAmNotARobot?.iAmNotARobotPlaceholder,
    submitButtonProps: recaptcha_invisible?.submitButtonProps,
  };
}
