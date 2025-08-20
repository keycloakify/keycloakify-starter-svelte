<script lang="ts">
  import { assert } from 'tsafe/assert';
  import { useI18n } from '../../../@keycloakify/login-ui-svelte/i18n/useI18n';
  import { useKcContext } from '../../KcContext.gen';
  // import { Template } from '../../components/Template';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'login.ftl');

  const { msg } = useI18n();
</script>

<!-- <Template /> -->
