import { useState } from '@keycloakify/svelte/tools/useState';
import { onMount } from 'svelte';
import { getI18nMessages, getUserProfile, type I18nMessages, type UserProfile } from './client';

export function useUserProfile() {
  const [userProfile, setUserProfile] = useState<UserProfile | undefined>(undefined);

  onMount(() => {
    getUserProfile().then(setUserProfile);
  });

  return { userProfile };
}

export function useI18nMessages() {
  const [i18nMessages, setI18nMessages] = useState<I18nMessages | undefined>(undefined);

  onMount(() => {
    getI18nMessages().then(setI18nMessages);
  });

  return { i18nMessages };
}
