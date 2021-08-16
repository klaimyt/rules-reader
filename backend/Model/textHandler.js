const axios = require('axios')

async function requestText(link) {
  try {
    // Request text file
    const {data: text} = await axios.get(link)
    // Remove unnecessary text (leave only the rules)
    const [rulesText] = /(?<=(credits)).*(?=(\r\n){2}glossary)/gis.exec(text)
    // Save to global variable
    global.globalTextJson = convertTextToJSON(rulesText)
  } catch (err) {
    console.error(err)
  }
}

function convertTextToJSON(unprocessedText) {
  const parsedText = {}

  function createSubtitleFor(titleObject, regExp) {
    let searchResult = regExp.exec(unprocessedText)
    if (!searchResult) return
    
    const subtitle = {}
    titleObject[searchResult[0]] = subtitle

    createSubtitleFor(subtitle, new RegExp(String.raw`(?<=(\r\n){2})(${searchResult[2]}(\d+|\w))\.? .*?(?=(\r\n){2})`, 'gis'))
    createSubtitleFor(titleObject, regExp)
  }

  // This is kind of kludge because I have no RegExp that fits titles and subtitle at the same time.
  // This part of code creates main 9 titles (1-9)
  const regExp = /(?<=(\r\n){2})(\d)\. .*(?=(\r\n){2})/gi
  let searchResult = regExp.exec(unprocessedText)
  while (searchResult) {
    const titleObject = {}
    parsedText[searchResult[0]] = titleObject
    createSubtitleFor(titleObject, new RegExp(String.raw`(?<=(\r\n){2})(${searchResult[2]}\d+\.) .*?(?=(\r\n){2})`, 'gis'))
    searchResult = regExp.exec(unprocessedText)
  }

  return parsedText
}

module.exports.requestText = requestText