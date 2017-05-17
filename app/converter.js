let cheerio = require('cheerio');
let personalizationSelectorValidator = require('./validator');

module.exports = {
    convertPersonalizationObjects: function(contentObject) {
       let context = cheerio.load(contentObject.content);
       let personalizations = context('span').toArray().map(element => {
         return createPersonalizationObject(context(element), contentObject.id);
       });
       return { personalizations: personalizations, id:contentObject.id };
    },

    convertPersonalizationList: function(contentObjects) {
        return contentObjects.map(content => this.convertPersonalizationObjects(content));
    }
};

function createPersonalizationObject(selector, id) {
    let personalization = {};

    personalization.id = id;
    personalization.contextField = parseInt(selector.attr('e-personalization'));
    personalization.text = selector.text();
    personalization.content = replaceSelectorInContext(selector);

    return personalization;
}

function replaceSelectorInContext(selector) {
    //TODO: Write replacement logic
    return selector.html();
}
