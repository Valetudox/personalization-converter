let expect = require("chai").expect;
let converter = require("../app/converter");
let { convertPersonalizationObjects } = require('../app/converter');
let cheerio = require('cheerio');

describe("#convertPersonalizationObjects", function() {

    it("should give back the original id in the returned object", function() {
        let testObject = {
            id: 54321,
            content: `<span class="cbNonEditable" e-personalization="1">First Name</span>`
        };
       expect(convertPersonalizationObjects(testObject).id).to.equal(testObject.id);
    });

    it("should extract tokens to a personalizations array", function() {
        let testObject = {
            id: 54321,
            content:
            `<div>
                <span class="cbNonEditable" e-personalization="1">First Name</span>
            </div>`
        };
       expect(convertPersonalizationObjects(testObject).personalizations.length).to.equal(1);
    });

    it("should extract multiple token if the given content has more", function() {
        let testObject = {
            id: 54321,
            content: `<span class="cbNonEditable" e-personalization="1">First Name</span>
                      <span class="cbNonEditable" e-personalization="2">Last Name</span>`
        };
       expect(convertPersonalizationObjects(testObject).personalizations.length).to.equal(2);
    });

    it("should create a unique id for the collected personalizations", function() {
        let testObject = {
            id: 54321,
            content:
            `<div>
                <span class="cbNonEditable" e-personalization="1">First Name</span>
                <span class="cbNonEditable" e-personalization="1">Last Name</span>
            </div>`
        };
        const returnObjects = convertPersonalizationObjects(testObject).personalizations;
        expect(returnObjects[0].id).to.not.eql(returnObjects[1].id);
    });

    it("should add contact field id to the collected personalizations from the token", function() {
        let value = 3;
        let testObject = {
            id: 54321,
            content: `<span class="cbNonEditable" e-personalization="${value}">First Name</span>`
        };
        expect(convertPersonalizationObjects(testObject).personalizations.pop().contactField).to.equal(value);
    });

    it("should add display name to the collected personalization from the token", function() {
        let text = `test text`;
        let testObject = {
            id: 54321,
            content: `<span class="cbNonEditable" e-personalization="1">${text}</span>`
        };
        expect(convertPersonalizationObjects(testObject).personalizations.pop().text).to.equal(text);
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
        expect(convertPersonalizationObjects(testObject).personalizations.pop().content.replace(/ /g, ''))
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
