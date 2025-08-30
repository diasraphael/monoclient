import { config as reactInternalConfig } from "@repo/eslint-config/react-internal";

const eslintConfig = [
  ...reactInternalConfig,
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      ".turbo/**",
    ],
  },
];

export default eslintConfig;
