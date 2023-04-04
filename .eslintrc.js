module.exports = {
  env: {
    node: true,
  },
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },
  extends: [
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
  ],
  ignorePatterns: ["node_modules/**"],
  rules: {
    // override/add rules settings here, such as:
    "vue/no-unused-vars": "error",
    "no-console": "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/no-unused-vars": "off",
    "vue/multi-word-component-names": "off",
    "vue/no-reserved-component-names": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "vue/prop-name-casing": "off",
    "no-undef": "off",
  },
};
