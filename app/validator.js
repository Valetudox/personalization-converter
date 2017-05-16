let cheerio = require('cheerio');

module.exports = {
    validate: function(input) {
        return parseInt(input.attr('e-personalization')) && input.text;
    }
};
