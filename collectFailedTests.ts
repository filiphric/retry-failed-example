import * as fs from "fs";

import * as path from "path";

const collectFailingTests = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  on("after:run", async results => {
    // Handle both successful and failed runs
    if ('runs' in results) {
      const failedSpecs = results.runs
        .filter(run => run.stats.failures > 0)
        .map(run => run.spec.relative);

      if (failedSpecs.length > 0) {
        const failedTestFilePath = "./cypress/test-results/";
        fs.mkdirSync(failedTestFilePath, { recursive: true });
        fs.writeFileSync(
          path.join(failedTestFilePath, "failed-specs"),
          failedSpecs.join(","),
        );
      }
    }
  });

  return collectFailingTests;
};

export { collectFailingTests };