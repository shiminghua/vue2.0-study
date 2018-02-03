/**
 * empty object
 * 空对象
 */
const emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  // 如果不是生产环境，冻结 emptyObject
  Object.freeze(emptyObject);
}

module.exports = emptyObject;