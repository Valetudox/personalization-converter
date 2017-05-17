let cheerio = require('cheerio');

module.exports = {
    isValid: function(context) {
        return context.html() !== ''
            && context.attr('e-personalization')
            && context.hasClass('cbNonEditable');
    }
};
