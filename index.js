const fs = require('fs');

let result = []

let rawData = fs.readFileSync('data.json');
let data = JSON.parse(rawData);
let rawReplacement = fs.readFileSync('replacement.json');
let replacement = JSON.parse(rawReplacement);

// Перебор изменений
const replacementFind = () => {
  let replacements = []
  replacements = replacement.filter((rep) => data.indexOf(rep.replacement) !== -1)
  return replacements = replacements[replacements.length - 1]
}

// Нахождение неправильной строки
const replaceWrongStrings = (data) => {
  let correctReplacement = replacementFind()
  if (correctReplacement !== undefined) {
    return data.replace(correctReplacement.replacement, correctReplacement.source)
  } else {
    return data
  }
}

// Поиск замены
const isCorrect = (data) => {
  let arr = rep.map((r) => data.indexOf(r) === -1)
  let isCorrect = arr.indexOf(false) === -1 ? true : false
  return isCorrect
}

// Замена ошибок на корректные варианты
let rep = replacement.map((r) => r.replacement)
for (let i = 0; i < data.length; i++) {
  result[i] = data[i]
  while (!isCorrect(result[i])) {
    result[i] = replaceWrongStrings(result[i])
  }
  if (result[i] === 'null' || result[i] === null) {
    delete result[i]
    result = result.filter(n => n)
  }
}

let resultStringify = JSON.stringify(result, null, 2);
fs.writeFileSync('result.json', resultStringify);