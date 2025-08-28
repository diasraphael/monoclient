import { config as baseConfig } from "@repo/eslint-config/base";

const eslintConfig = [
  ...baseConfig,
  {
    ignores: ["apps/**", "packages/**"],
  },
  {
    files: ["*.js", "*.ts", "*.tsx"],
    rules: {
      "turbo/gen": "error",
    },
  },
];

export default eslintConfig;
