import { defineConfig } from "cypress";
import { collectFailingTests } from "./collectFailedTests";

export default defineConfig({
  e2e: {
    setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
      collectFailingTests(on, config);
    },
  }
});
