module.exports = {
  presets: [
    "@babel/env"
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties", // 私有属性
    "@babel/plugin-proposal-private-methods", // 私有方法
    // "@babel/plugin-proposal-function-bind",
  ]
};