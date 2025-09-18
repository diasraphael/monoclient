import { config as reactInternalConfig } from "@repo/eslint-config/react-internal";

const eslintConfig = [
  ...reactInternalConfig,
  {
    ignores: ["node_modules/**", "dist/**", ".turbo/**"],
  },
  {
    rules: {
      "react/prop-types": "off", // We use TypeScript for prop validation
      "import/order": "off", // Disable import order rules for shadcn components
    },
  },
];

export default eslintConfig;
