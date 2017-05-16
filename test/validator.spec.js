let expect    = require("chai").expect;
let validator = require("../app/validator");
let cheerio = require('cheerio')

describe("#validator", function() {
    it("should not validate if selector does not match", function() {
       expect(validator.validate(cheerio.load('<a></a>'))).to.be.false;
    });

    it("should not validate if properties does not match", function() {
       expect(validator.validate(cheerio.load('<span></span>'))).to.be.false;
    });

    it("should validate a span selector with the appropriate properties", function() {
        const validSelector = cheerio.load('<span class="cbNonEditable" e-personalization="1">First Name</span>');
        expect(validator.validate(validSelector)).to.be.true;
    });
});
