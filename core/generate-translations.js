const fs = require('fs')
const path = require('path')
const dir = __dirname
const translations = ['fr', 'ru', 'pt']
const enTranslation = require('../locales/en.json')
const translate = require('yandex-translate')('trnsl.1.1.20190831T164359Z.01123652853711a7.2ba5c8d5f247459c0c1cd2c3b5f8ca2d4450027e');

console.time('translations')
translations.reduce(async (acc, translation, index) => {
  acc = await acc
  console.log(`Translating from en to ${translation}...`)
  const newJsonTranslation = await Object.entries(enTranslation).reduce(async (acc, [ key, value ]) => {
    acc = await acc
    if (typeof value === 'string') {
      acc[key] = await new Promise((resolve, reject) => {
        translate.translate(value, { to: translation }, function(err, res) {
          if (err) reject(err)
          else resolve(res.text[0])
       })
      })
    } else {
      acc[key] = await Object.entries(value).reduce(async (acc, [ childKey, childValue ]) => {
        acc[childKey] = await new Promise((resolve, reject) => {
          translate.translate(childValue, { to: translation }, function(err, { text }) {
            if (err) reject(err)
            else resolve(text[0])
         })
        })
        return acc
      }, {})
    }
    return acc
  }, {})

  fs.writeFile(path.join(dir, `./../locales/${translation}.json`), JSON.stringify(newJsonTranslation, null, "\t"), (err) => {
    if (err) console.log(err);
  })
  console.log(`${translation} translation generated with success`);

  if (translations.length === index + 1) {
    console.timeEnd('translations')
  }
  return acc
}, {})
