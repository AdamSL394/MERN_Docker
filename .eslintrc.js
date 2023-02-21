
module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true,
    },
    'extends': [
        'plugin:react/recommended',
        'eslint:recommended',
        'google',
    ],
    'overrides': [],
    'parser': '@babel/eslint-parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'requireConfigFile': false,
        'sourceType': 'module',
        'ecmaFeatures': {
            'jsx': true,
        },
        'babelOptions': {
            'presets': [
                '@babel/preset-react',
            ],
        },
    },
    'plugins': [
        'react',
    ],
    'rules': {
        'object-curly-spacing': ['error', 'always',
        ],
        'indent': ['error',
            4,
        ],
        'require-jsdoc': 0,
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
    },
    "eslint.workingDirectories": [
        "./client",
        "./server"
      ]
};

