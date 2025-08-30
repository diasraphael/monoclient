import { config as baseConfig } from "@repo/eslint-config/base";

const eslintConfig = [
  ...baseConfig,
  {
    ignores: ["apps/**", "packages/**"],
  },
  {
    files: ["*.js", "*.ts", "*.tsx"],
    rules: {
      // Turbo-specific rules can be added here when available
    },
  },
];

export default eslintConfig;
