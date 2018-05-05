module.exports = {
    "extends": "standard",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        },
    },
    "rules": {
        "no-useless-concat": "off",
        "import/no-unresolved": "off",
        "import/extensions": "off",
        "jsx-a11y/anchor-is-valid": [ "error", { "components": [ "Link" ], "specialLink": [ "to" ] } ],

    }
};
