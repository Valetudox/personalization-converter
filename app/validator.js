let cheerio = require('cheerio');

module.exports = {
    isValid: function(context) {
       const selector = cheerio(context('span[class=cbNonEditable]'));
        return context.html() !== '' && selector.attr('e-personalization').length !== 0;
    }
};
