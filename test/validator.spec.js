let expect    = require("chai").expect;
let validator = require("../app/validator");
let cheerio = require('cheerio');

describe("#isValid", function() {
    it("should not validate if selector does not match", function() {
       expect(validator.isValid(cheerio.load(`<a></a>`))).to.be.false;
    });

    it("should not validate if properties does not match", function() {
       expect(validator.isValid(cheerio.load(`<span></span>`))).to.be.false;
    });

    it("should not validate if token content missing", function() {
       expect(validator.isValid(cheerio.load(`<span class="cbNonEditable" e-personalization="1"></span>`))).to.be.false;
    });

    it("should validate a span selector with the approppriate properties", function() {
        const validSelector = cheerio.load(`<span class="cbNonEditable" e-personalization="1">First Name</span>`);
        expect(validator.isValid(validSelector)).to.be.true;
    });
});
