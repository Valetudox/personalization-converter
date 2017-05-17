let cheerio = require('cheerio');
let personalizationSelectorValidator = require('./validator');
var uuid = require('uuid-v4');

module.exports = {
    convertPersonalizationObjects: function(contentObject) {
       let context = cheerio.load(contentObject.content);
       const personalizations = collectPersonalizations(context)
       return {
         personalizations,
         id: contentObject.id,
         content: replaceTokens(context, personalizations)
      };
    },

    convertPersonalizationList: function(contentObjects) {
        return contentObjects.map(content => this.convertPersonalizationObjects(content));
    }
};

function replaceTokens(context, personalizations) {
  context('span').filter((index, element) => personalizationSelectorValidator.isValid(context(element)))
  .each((index, element) => {
    context(element).replaceWith(`#personalization-token-${personalizations[index].id}#`);
  });
  return context.html();
}

function collectPersonalizations(context) {
  return context('span').toArray().filter(element => personalizationSelectorValidator.isValid(context(element)))
  .map(element => createPersonalizationObject(context(element)));
}

function createPersonalizationObject(tokenSpanElement) {
    return {
      id: uuid(),
      contactField: parseInt(tokenSpanElement.attr('e-personalization')),
      text: tokenSpanElement.text()
    };
}
