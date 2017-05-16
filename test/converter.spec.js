let expect    = require("chai").expect;
let converter = require("../app/converter");
let cheerio = require('cheerio')

describe("#convertPersonalizationObjects", function() {
   /*
    it("should convert 0 objects if no span in HTML", function() {
        let testObject = {
            id: 54321,
            content: '<a></a>'
        };
       expect(converter.convertPersonalizationObjects(testObject).length).to.equal(0);
    });

    it("should convert 0 objects if appropriate properties are not set", function() {
        let testObject = {
            id: 54321,
            content: '<span>Last Name</span>'
        };
       expect(converter.convertPersonalizationObjects(testObject).length).to.equal(0);
    });
    */
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

    it("should convert 2 objects", function() {
        let testObject = {
            id: 54321,
            content: `<span class="cbNonEditable" e-personalization="1">First Name</span>
                      <span class="cbNonEditable" e-personalization="2">Last Name</span>`
        };
       expect(converter.convertPersonalizationObjects(testObject).length).to.equal(2);
    });

    it("all of the result object's id should be the same as the input object's id", function() {
        let testObject = {
            id: 54321,
            content: `<span class="cbNonEditable" e-personalization="1">First Name</span>
            <span class="cbNonEditable" e-personalization="2">Last Name</span>`
        };
        isActualIdsMatchExpected = converter.convertPersonalizationObjects(testObject)
            .map(convertedObject => convertedObject.id)
            .reduce((acc, val, index) => val === testObject.id, true);

        expect(isActualIdsMatchExpected).to.be.true;
    });

    it("all the result object's id's match", function () {
        let testObjects = [{
            id: 11111,
            content: '<span class="cbNonEditable" e-personalization="1">First Name</span>'
        },
        {
            id: 22222,
            content: '<span class="cbNonEditable" e-personalization="2">Last Name</span>'
        }];
        let expectedIds = testObjects.map(obj => obj.id);
        let convertedObjects = testObjects.map(obj => converter.convertPersonalizationObjects(obj));
        let actualIds = convertedObjects.map(convertedArray => convertedArray[0].id);

        let isAllIdsMatch = expectedIds.reduce((acc, id, index) => id === actualIds[index], true);
        expect(isAllIdsMatch).to.be.true;
    });

    it("the result object's contextField should be the same as the e-personalization value", function() {
        let contextField = 3;
        let testObject = {
            id: 54321,
            content: '<span class="cbNonEditable" e-personalization="'+ contextField+ '">First Name</span>'
        };
        expect(converter.convertPersonalizationObjects(testObject)[0].contextField).to.equal(contextField);
    });

    it("the result object's text should be the same as the span's text value", function() {
        let text = "test text"
        let testObject = {
            id: 54321,
            content: '<span class="cbNonEditable" e-personalization="1">'+ text+'</span>'
        };
        expect(converter.convertPersonalizationObjects(testObject)[0].text).to.equal(text);
    });
});
