let cheerio = require('cheerio');

module.exports = {
    isValid: function(context) {
        const selector = cheerio(context('span[class=cbNonEditable]'));
        return selector.attr('e-personalization') !== undefined
            && selector.html() !== undefined;
    }
};
