let cheerio = require('cheerio');
let personalizationSelectorValidator = require('./validator');
var uuid = require('uuid-v4');

module.exports = {
    convertPersonalizationObjects: function(contentObject) {
       let context = cheerio.load(contentObject.content);
       let personalizations = context('span').toArray().map(element => {
         return createPersonalizationObject(context(element));
       });
       return { personalizations: personalizations, id:contentObject.id };
    },

    convertPersonalizationList: function(contentObjects) {
        return contentObjects.map(content => this.convertPersonalizationObjects(content));
    }
};

function createPersonalizationObject(selector) {
    let personalization = {};

    personalization.id = uuid();
    personalization.contextField = parseInt(selector.attr('e-personalization'));
    personalization.text = selector.text();
    personalization.content = replaceSelectorInContext(selector);

    return personalization;
}

function replaceSelectorInContext(selector) {
    //TODO: Write replacement logic
    return selector.html();
}
