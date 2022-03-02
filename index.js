const fs = require('fs');

let rawData = fs.readFileSync('data.json');
let data = JSON.parse(rawData);

let rawReplacement = fs.readFileSync('replacement.json');
let replacement = JSON.parse(rawReplacement);

const replaceWrongStrings = (data) => {
  let replacements = []
  replacements = replacement.filter((rep) => data.indexOf(rep.replacement) !== -1)
  replacements = replacements[replacements.length - 1]
  if (replacements !== undefined) {
    return data.replace(replacements.replacement, replacements.source)
  } else {
    return data
  }
}

const isCorrect = (data) => {
  let arr = rep.map((r) => data.indexOf(r) === -1)
  let isCorrect = arr.indexOf(false) === -1 ? true : false
  return isCorrect
}

let result = []
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