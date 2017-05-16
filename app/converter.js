let cheerio = require('cheerio');
let personalizationSelectorValidator = require('./validator');

module.exports = {
    convertPersonalizationObjects: function(contentObject) {
       let content = cheerio.load(contentObject.content);
       let personalizations = [];

       content('span').each((index, element) => {
           if (personalizationSelectorValidator.validate(content)) {
               personalizations.push(createPersonalizationObject(content, content(element), contentObject.id));
           }
       });
       return personalizations;
    }
};

function createPersonalizationObject(content, input, id) {
    let personalization = {};

    personalization.id = id;
    personalization.contextField = parseInt(input.attr('e-personalization'));
    personalization.text = input.text();
    personalization.content = replaceSelectorInContext(content, input);

    return personalization;
}

function replaceSelectorInContext(content, input) {
    //TODO: Write replacement logic
    return content.html();
}
