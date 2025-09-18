module.exports = {
  extends: ["@repo/eslint-config/react-internal.js"],
  rules: {
    "react/prop-types": "off", // We use TypeScript for prop validation
  },
};
