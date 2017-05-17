let cheerio = require('cheerio');
let personalizationSelectorValidator = require('./validator');

module.exports = {
    convertPersonalizationObjects: function(contentObject) {
       let context = cheerio.load(contentObject.content);
       let personalizations = [];

       context('span').each((index, selector) => {
           if (personalizationSelectorValidator.isValid(context)) {
               personalizations.push(createPersonalizationObject(context, selector, contentObject.id));
           }
       });
       return personalizations;
    },

    convertPersonalizationList: function(contentObjects) {
        return contentObjects.map(content => this.convertPersonalizationObjects(content));
    }
};

function createPersonalizationObject(context, selector, id) {
    let personalization = {};

    personalization.id = id;
    personalization.contextField = parseInt(context(selector).attr('e-personalization'));
    personalization.text = context(selector).text();
    personalization.content = replaceSelectorInContext(context, selector);

    return personalization;
}

function replaceSelectorInContext(context, selector) {
    //TODO: Write replacement logic
    return context.html();
}
