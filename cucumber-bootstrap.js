const setJestCucumberConfiguration = require("jest-cucumber").setJestCucumberConfiguration;
setJestCucumberConfiguration({
  tagFilter: ["not @wip"],
});
