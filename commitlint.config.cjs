const x = require('@commitlint/config-conventional')

const ruleBodyMaxLineLength = x.rules['body-max-line-length']

ruleBodyMaxLineLength[0] = process.env.CI === 'true' ? 1 : 2

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': ruleBodyMaxLineLength,
  },
}
