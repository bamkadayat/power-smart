import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const forbidFeatures = (...features) => ({
  group: features.flatMap((f) => [`@/features/${f}`, `@/features/${f}/*`]),
  message:
    "Features must not import other features. Compose features in src/app/ or move shared code to src/shared/.",
});

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    files: ["src/features/prices/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        { patterns: [forbidFeatures("area", "recommendations")] },
      ],
    },
  },
  {
    files: ["src/features/area/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        { patterns: [forbidFeatures("prices", "recommendations")] },
      ],
    },
  },
  {
    files: ["src/features/recommendations/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        { patterns: [forbidFeatures("prices", "area")] },
      ],
    },
  },
  {
    files: ["src/shared/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features", "@/features/*"],
              message:
                "src/shared/ must not depend on features. Move shared code to shared/ or compose in src/app/.",
            },
            {
              group: ["@/app", "@/app/*"],
              message: "src/shared/ must not depend on app/.",
            },
          ],
        },
      ],
    },
  },

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "playwright-report/**",
    "test-results/**",
  ]),
]);

export default eslintConfig;
