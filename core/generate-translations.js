const fs = require('fs')
const path = require('path')
const dir = __dirname
const translations = ['zh', 'es', 'hi', 'ar', 'ru']
const enTranslation = require('../locales/en.json')
const yandexTranslate = require('yandex-translate');

translations.forEach(async translation => {
  const { translate } = yandexTranslate(process.env.YANDEX_API_KEY || require('./../configs').YANDEX_API_KEY)

  const newJsonTranslation = await Object.entries(enTranslation).reduce(async (acc, [ key, value ]) => {
    acc = await acc
    if (typeof value === 'string') {
      acc[key] = await new Promise((resolve, reject) => {
        translate(value, { to: translation }, function(err, res) {
          console.log(res)
          if (err) reject(err)
          else resolve(res.text[0])
       })
      })
    } else {
      acc[key] = await Object.entries(value).reduce(async (childAcc, [ childKey, childValue ]) => {
        childAcc = await childAcc
        childAcc[childKey] = await new Promise((resolve, reject) => {
          translate(childValue, { to: translation }, function(err, res) {
            console.log(res)
            if (err) reject(err)
            else resolve(res.text[0])
         })
        })
        return childAcc
      }, {})
    }
    return acc
  }, {})

  fs.writeFile(path.join(dir, `./../locales/${translation}.json`), JSON.stringify(newJsonTranslation, null, "\t"), (err) => {
    if (err) console.log(err);
  })
  console.log(`${translation} translation generated with success`);
})
