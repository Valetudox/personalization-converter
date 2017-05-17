let expect    = require("chai").expect;
let converter = require("../app/converter");
let cheerio = require('cheerio');

describe("#convertPersonalizationObjects", function() {

    it("should convert 2 objects", function() {
        let testObject = {
            id: 54321,
            content: `<span class="cbNonEditable" e-personalization="1">First Name</span>
                      <span class="cbNonEditable" e-personalization="2">Last Name</span>`
        };
       expect(converter.convertPersonalizationObjects(testObject).length).to.equal(2);
    });

    it("should convert 1 object in context", function() {
        let testObject = {
            id: 54321,
            content: 
            `<div>
                <span class="cbNonEditable" e-personalization="1">First Name</span>
            </div>`
        };
       expect(converter.convertPersonalizationObjects(testObject).length).to.equal(1);
    });

    it("should return an object where the id's should be the same as the input object's id", function() {
        let testObject = {
            id: 54321,
            content: `<span class="cbNonEditable" e-personalization="1">First Name</span>
                      <span class="cbNonEditable" e-personalization="2">Last Name</span>`
        };
        isActualIdsMatchExpected = converter.convertPersonalizationObjects(testObject)
            .map(convertedObject => convertedObject.id)
            .reduce((acc, id) => id === testObject.id, true);

        expect(isActualIdsMatchExpected).to.be.true;
    });

    it("should return an object where the contextField should be the same as the e-personalization value", function() {
        let value = 3;
        let testObject = {
            id: 54321,
            content: `<span class="cbNonEditable" e-personalization="${value}">First Name</span>`
        };
        expect(converter.convertPersonalizationObjects(testObject)[0].contextField).to.equal(value);
    });

    it("should return an object where the text property shouldmatch the span's text value", function() {
        let text = `test text`
        let testObject = {
            id: 54321,
            content: `<span class="cbNonEditable" e-personalization="1">${text}</span>`
        };
        expect(converter.convertPersonalizationObjects(testObject)[0].text).to.equal(text);
    });
});
