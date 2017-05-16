let expect    = require("chai").expect;
let validator = require("../app/validator");
let cheerio = require('cheerio')

describe("#validator", function() {
    it.skip("should not validate if selector does not match", function() {
       let $ = cheerio.load('<a></a>');
       expect(validator.validate($.html('<a></a>'))).to.be.false;
    });

    it.skip("should not validate if properties does not match", function() {
       expect().to.be.false;
    });

    it.skip("should validate", function() {
        let $ = cheerio.load('<span class="cbNonEditable" e-personalization="1">First Name</span>');
    });
});
