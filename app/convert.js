let cheerio = require('cheerio');
var uuid = require('uuid-v4');

module.exports = function convert(contentObject) {
  let context = cheerio.load(contentObject.content);
  const personalizations = collectPersonalizations(context)
  return {
    personalizations,
    id: contentObject.id,
    content: replaceTokens(context, personalizations)
  };
}

function replaceTokens(context, personalizations) {
  context('span').filter((index, element) => isValid(context(element)))
  .each((index, element) => {
    context(element).replaceWith(`#personalization-token-${personalizations[index].id}#`);
  });
  return context.html();
}

function collectPersonalizations(context) {
  return context('span').toArray().filter(element => isValid(context(element)))
  .map(element => createPersonalizationObject(context(element)));
}

function isValid(context) {
    return context.html() !== ''
        && context.attr('e-personalization')
        && context.hasClass('cbNonEditable');
}

function createPersonalizationObject(tokenSpanElement) {
    return {
      id: uuid(),
      contactField: parseInt(tokenSpanElement.attr('e-personalization')),
      text: tokenSpanElement.text()
    };
}



