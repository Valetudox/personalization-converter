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

    it("should return an object where the text property should match the span's text value", function() {
        let text = `test text`
        let testObject = {
            id: 54321,
            content: `<span class="cbNonEditable" e-personalization="1">${text}</span>`
        };
        expect(converter.convertPersonalizationObjects(testObject)[0].text).to.equal(text);
    });
});

describe("#convertPersonalizationList", function() {
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
        
         expect(testObjects.length).to.equal(converter.convertPersonalizationList(testObjects).length);
     });

    it("should convert a list, where all object's id's matches", function () {
        let testObjects = [{
            id: 11111,
            content: `<span class="cbNonEditable" e-personalization="1">First Name</span>`
        },
        {
            id: 22222,
            content: `<span class="cbNonEditable" e-personalization="2">Last Name</span>`
        }];
        let expectedIds = testObjects.map(object => object.id);
        let actualIds = converter.convertPersonalizationList(testObjects)
            .map(convertedArray => convertedArray[0].id);
        let isAllIdsMatch = expectedIds.reduce((acc, id, index) => id === actualIds[index], true);
         
        expect(isAllIdsMatch).to.be.true;
     });
});
