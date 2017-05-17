const convert = require('./convert');

module.exports = function convertPersonalizationList(contentObjects) {
  return contentObjects.map(convert);
};
