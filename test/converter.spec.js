let expect = require("chai").expect;
let converter = require("../app/converter");
let cheerio = require('cheerio');

describe("#convertPersonalizationObjects", function() {

    it("should match the id", function() {
        let testObject = {
            id: 54321,
            content: `<span class="cbNonEditable" e-personalization="1">First Name</span>`
        };
       expect(converter.convertPersonalizationObjects(testObject).id).to.equal(testObject.id);
    });

    it("should convert 2 objects", function() {
        let testObject = {
            id: 54321,
            content: `<span class="cbNonEditable" e-personalization="1">First Name</span>
                      <span class="cbNonEditable" e-personalization="2">Last Name</span>`
        };
       expect(converter.convertPersonalizationObjects(testObject).personalizations.length).to.equal(2);
    });

    it("should convert 1 object in context", function() {
        let testObject = {
            id: 54321,
            content:
            `<div>
                <span class="cbNonEditable" e-personalization="1">First Name</span>
            </div>`
        };
       expect(converter.convertPersonalizationObjects(testObject).personalizations.length).to.equal(1);
    });

    it("should return a list of objects where the id's should be the same as the input object's id", function() {
        let testObject = {
            id: 54321,
            content: `<span class="cbNonEditable" e-personalization="1">First Name</span>
                      <span class="cbNonEditable" e-personalization="2">Last Name</span>`
        };
        isActualIdsMatchExpected = converter.convertPersonalizationObjects(testObject).personalizations
            .map(convertedObject => convertedObject.id)
            .reduce((acc, id) => id === testObject.id, true);

        expect(isActualIdsMatchExpected).to.be.true;
    });

    it("should return a list of objects where the contextField should be the same as the e-personalization value", function() {
        let value = 3;
        let testObject = {
            id: 54321,
            content: `<span class="cbNonEditable" e-personalization="${value}">First Name</span>`
        };
        expect(converter.convertPersonalizationObjects(testObject).personalizations.pop().contextField).to.equal(value);
    });

    it("should return a list of objects where the text property should match the span's text value", function() {
        let text = `test text`;
        let testObject = {
            id: 54321,
            content: `<span class="cbNonEditable" e-personalization="1">${text}</span>`
        };
        expect(converter.convertPersonalizationObjects(testObject).personalizations.pop().text).to.equal(text);
    });

    it.skip("should return a list of objects where the personalization in the content property should be replaced", function() {
        let testObject = {
            id: 54321,
            content:
            `<div>
                <span class="cbNonEditable" e-personalization="1">text</span>
            </div>`
        };
        expectedContent =
            `<div>
                #TOKEN
            </div>`;
        expect(converter.convertPersonalizationObjects(testObject).personalizations.pop().content.replace(/ /g, ''))
            .to.equal(expectedContent.replace(/ /g, ''));
    });
});

describe("#convertPersonalizationList", function() {

    it("should convert an empty list", function () {
         expect(converter.convertPersonalizationList([]).length).to.equal(0);
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
         expect(converter.convertPersonalizationList(testObjects).length).to.equal(3);
     });
});
