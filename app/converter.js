let cheerio = require('cheerio');
let personalizationSelectorValidator = require('./validator');
var uuid = require('uuid-v4');

module.exports = {
    convertPersonalizationObjects: function(contentObject) {
       let context = cheerio.load(contentObject.content);
       let personalizations = context('span').toArray().map(element => {
         return createPersonalizationObject(context(element));
       });
       return { personalizations: personalizations, id: contentObject.id };
    },

    convertPersonalizationList: function(contentObjects) {
        return contentObjects.map(content => this.convertPersonalizationObjects(content));
    }
};

function createPersonalizationObject(tokenSpanElement) {
    return {
      id: uuid(),
      contactField: parseInt(tokenSpanElement.attr('e-personalization')),
      text: tokenSpanElement.text()
    };
}
