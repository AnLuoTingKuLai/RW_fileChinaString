// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    //规则配置
    'no-empty': 2,
    'no-extra-boolean-cast': 2, //禁止不必要的布尔转换
    'no-extra-parens': 2, //禁止不必要的括号
    'no-extra-semi': 0, //禁止不必要的分号
    "semi": [0, "always"],//语句强制分号结尾
    "eqeqeq": 0, //必须使用全等
    "no-multi-spaces": 2, //不能用多余的空格
    "no-spaced-func": 2, //函数调用时 函数名与()之间不能有空格
    "array-bracket-spacing": [2, "never"], //是否允许非空数组里面有多余的空格
    "indent": [2, 4], //缩进风格
    "no-multiple-empty-lines": [0, {"max": 2}], //空行最多不能超过2行
    "comma-spacing": 2, //逗号前后的空格
    "no-var": 2, //禁用var，用let和const代替
    "no-unused-vars": 2, //不能有声明后未被使用的变量或参数
    "no-mixed-spaces-and-tabs": 2, //禁止空格和 tab 的混合缩进
  }
}
