module.exports = {
  // Lint & Prettify TS and JS files
  '**/*.(ts|tsx|js)': () => [`yarn lint:strict`, `yarn format:write`],

  // Prettify only Markdown and JSON files
  '**/*.(md|json)': () => `yarn format:write`,
};
