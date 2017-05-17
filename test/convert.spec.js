const expect = require("chai").expect;
const convert  = require('../app/convert');
const cheerio = require('cheerio');
const getFirstId = obj => obj[0].id;
const getSecondId = obj => obj[1].id;
const getFirstContactField = obj => obj.personalizations[0].contactField;
const getFirstPersonalizationId = obj => obj.personalizations[0].id;
const getSecondPersonalizationId = obj => obj.personalizations[1].id;
const getFirstText = obj => obj.personalizations[0].text;

describe("#convertPersonalizationObjects", function() {

    it("should give back the original id in the returned object", function() {
        let testObject = {
            id: 54321,
            content: `<span class="cbNonEditable" e-personalization="1">First Name</span>`
        };
       expect(convert(testObject).id).to.equal(testObject.id);
    });

    it("should extract tokens to a personalizations array", function() {
        let testObject = {
            id: 54321,
            content:
            `<div>
                <span class="cbNonEditable" e-personalization="1">First Name</span>
            </div>`
        };
       expect(convert(testObject).personalizations.length).to.equal(1);
    });

    it("should extract multiple token if the given content has more", function() {
        let testObject = {
            id: 54321,
            content: `<span class="cbNonEditable" e-personalization="1">First Name</span>
                      <span class="cbNonEditable" e-personalization="2">Last Name</span>`
        };
       expect(convert(testObject).personalizations.length).to.equal(2);
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
        const returnObjects = convert(testObject).personalizations;
        expect(getFirstId(returnObjects)).to.not.eql(getSecondId(returnObjects));
    });

    it("should add contact field id to the collected personalizations from the token", function() {
        let value = 3;
        let testObject = {
            id: 54321,
            content: `<span class="cbNonEditable" e-personalization="${value}">First Name</span>`
        };
        expect(getFirstContactField(convert(testObject))).to.equal(value);
    });

    it("should add display name to the collected personalization from the token", function() {
        let text = `test text`;
        let testObject = {
            id: 54321,
            content: `<span class="cbNonEditable" e-personalization="1">${text}</span>`
        };
        expect(getFirstText(convert(testObject))).to.equal(text);
    });

    it("should return a list of objects where the personalizations in the content properties should be replaced with tokenids", function() {
        let testObject = {
            id: 54321,
            content: `<div><span class="cbNonEditable" e-personalization="1">text</span><span class="cbNonEditable" e-personalization="2">text</span></div>`
        };
        let actualObject = convert(testObject);
        expectedContent =
          `<div>` +
          `#personalization-token-${getFirstPersonalizationId(actualObject)}#` +
          `#personalization-token-${getSecondPersonalizationId(actualObject)}#` +
          `</div>`
        expect(actualObject.content).to.equal(expectedContent);
    });

    it("should not validate token with no text", function() {
        let testObject = {
            id: 54321,
            content: `<span class="cbNonEditable" e-personalization="1"></span>`
        };
       expect(convert(testObject).personalizations.length).to.equal(0);
    });

    it("should not validate token with the properties not set", function() {
        let testObject = {
            id: 54321,
            content: `
              <span e-personalization="1">text</span>
              <span class="cbNonEditable">text</span>
              <span>text</span>
            `
        };
       expect(convert(testObject).personalizations.length).to.equal(0);
    });

});
