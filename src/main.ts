import { mount } from "svelte";
import KcPage from "./login/KcPage.svelte";

// The following block can be uncommented to test a specific page with `yarn dev`
// Don't forget to comment back or your bundle size will increase

import { getKcContextMock } from "./login/KcPageStory";

if (import.meta.env.DEV) {
    window.kcContext = getKcContextMock({
        pageId: "code.ftl",
        overrides: {}
    });
}

let app;
if (window.kcContext) {
  app = mount(KcPage, {
    target: document.getElementById("app")!,
    props: { kcContext: window.kcContext },
  });
}
export default app;
