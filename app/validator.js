let cheerio = require('cheerio');

module.exports = {
    isValid: function(input) {
        if (parseInt(cheerio(input('span')).attr('e-personalization')) && input.text) {
            return true;
        }
        else {
            return false;
        }
    }
};
