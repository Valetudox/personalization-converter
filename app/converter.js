let cheerio = require('cheerio');
let personalizationSelectorValidator = require('./validator');

module.exports = {
    convertPersonalizationObjects: function(contentObject) {
       let $ = cheerio.load(contentObject.content);
       let personalizations = [];

       $('span').each(function(index, element) {
           if(personalizationSelectorValidator.validate($(element))){
               personalizations.push(createPersonalizationObject($, $(element), contentObject.id));
           }
       });
       return personalizations;
    }
};

function createPersonalizationObject($, input, id) {
    let personalization = {};

    personalization.id = id;
    personalization.contextField = parseInt(input.attr('e-personalization'));
    personalization.text = input.text();
    personalization.content = replaceSelectorInContext($, input);

    return personalization;
}

function replaceSelectorInContext($, input) {
    let replaceString = $('<p>#TOKEN</p>');
    input.replaceWith(replaceString);
    return $.html();
}
