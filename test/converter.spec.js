const expect = require("chai").expect;
const converter = require("../app/converter");
const cheerio = require('cheerio');

describe("#convertPersonalizationList", function() {

    it("should convert an empty list", function () {
         expect(converter([]).length).to.equal(0);
     });

    it("should convert a list of 3 items", function () {
         let testObjects = [{
             id: 11111,
             content: `<span class="cbNonEditable" e-personalization="1">First Name</span>`
         },
         {
             id: 22222,
             content: `<span class="cbNonEditable" e-personalization="2">Middle Name</span>`
         },
         {
             id: 33333,
             content: `<span class="cbNonEditable" e-personalization="3">Last Name</span>`
         }];
         expect(converter(testObjects).length).to.equal(3);
     });
});
