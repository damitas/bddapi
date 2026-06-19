module.exports = {
  default: {
    require: ["src/support/*.ts", "src/steps/*.ts"],
    requireModule: ["ts-node/register", "tsconfig-paths/register"],
    format: [
      "progress-bar",
      "summary",
      "html:reports/report.html",
      "json:reports/report.json",
    ],
  },
};
