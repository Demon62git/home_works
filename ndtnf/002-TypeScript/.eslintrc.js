module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    'prettier', // для интеграции с prettier
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint',
    'import',
  ],
  extends: [
    "eslint:recommended",
    'plugin:prettier/recommended', // для интеграции с prettier
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  root: true,
  env: {
    browser: true,
    node: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx', '*.json'],
      excludedFiles: ['**/*.test.js'],
    },
  ],
  rules: {
    'prettier/prettier': 'error', // заставляет ESLint проверять код на соответствие правилам Prettier
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // https://eslint.org/docs/latest/rules/indent
    indent: ['error', 2],
    'prefer-const': 'warn', // Требует использования `const` вместо `let` везде, где возможно
    'import/no-cycle': 2, // Запрещает циклические зависимости между модулями.
    'no-const-assign': 'error', // Запрещает присваивание новых значений переменным, объявленным с помощью `const`
    'no-var': 'error', // Запрещает использование ключевого слова `var` для объявления переменных. Рекомендуется использовать `let` или `const`
    'no-new-object': 'error', // Запрещает использование конструктора `Object()` для создания объектов. Вместо этого рекомендуется использовать литеральную нотацию `{ ... }`
    'no-prototype-builtins': 'error', // Запрещает прямое обращение к методам прототипа, таким как `__proto__`, `hasOwnProperty` и другим. Лучше использовать безопасные методы, такие как `Object.prototype.hasOwnProperty.call(obj, key)`
    'prefer-object-spread': 'error', // Предпочитает использование оператора распространения (`...`) для копирования объектов вместо методов вроде `Object.assign`
    'no-array-constructor': 'error', // Запрещает использование конструктора массива `new Array()`. Вместо этого рекомендуется использовать литеральную нотацию `[ ... ]`
    'array-callback-return': 'error', // Требует возвращения значения из всех коллбэк-функций, переданных в методы массивов, такие как `map`, `filter`, `reduce`
    quotes: ['error', 'single'], // Требует использования одинарных кавычек (`'`) вместо двойных (`"`)
    'template-curly-spacing': 'error', // запрещает наличие пробелов сразу после открывающейся фигурной скобки (`{`), а также перед закрывающейся фигурной скобкой (`}`
    'no-eval': 'error', // Запрещает использование функции `eval()`, так как она может представлять угрозу безопасности и затруднять отладку кода. `eval()` выполняет строку как код, что может позволить злоумышленникам внедрить вредоносный код
    'no-new-func': 'error', // Запрещает использование конструктора `Function()`, так как это аналогично использованию `eval()` и может представлять угрозу безопасности
    'wrap-iife': 'error', // Требует, чтобы немедленно вызываемые функции выражения (IIFE) были заключены в круглые скобки. Это делает код более читабельным и предотвращает возможные ошибки интерпретации
    'no-loop-func': 'error', // Запрещает создание функций внутри циклов, так как это может привести к непредвиденному поведению из-за замыканий
    'prefer-rest-params': 'error', // Предпочитает использование остаточного параметра (`...args`) вместо устаревшего объекта `arguments
    // https://eslint.org/docs/latest/rules/space-before-function-paren
    'space-before-function-paren': [
      'warn',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    // https://eslint.org/docs/latest/rules/no-trailing-spaces
    'no-trailing-spaces': ['error', { ignoreComments: true }],
    // https://eslint.org/docs/latest/rules/padded-blocks
    'padded-blocks': [
      'error',
      { blocks: 'never' },
      { allowSingleLineBlocks: true },
    ],
    // https://eslint.org/docs/latest/rules/comma-dangle
    'comma-dangle': ['error', 'always-multiline'],
    // https://eslint.org/docs/latest/rules/semi
    semi: ['warn', 'never']
  },
};
