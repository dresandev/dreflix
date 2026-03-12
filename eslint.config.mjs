import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    {
        rules: {
            "semi": ["warn", "never"],
            "jsx-quotes": ["warn", "prefer-double"],
            "quotes": ["warn", "double"],
            "@next/next/no-img-element": "off",
            "react-hooks/set-state-in-effect": "off"
        }
    },
    globalIgnores([
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
    ]),
])

export default eslintConfig
