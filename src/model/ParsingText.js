export default function convertTextToMap(unprocessedText) {
  const parsedDocument = new Map()

  function createSubtitleFor(titleMap, regExp) {
    // let
    const searchResult = regExp.exec(unprocessedText)
    if (!searchResult) return
    
    const subtitle = new Map()
    titleMap.set(searchResult[0], subtitle)

    createSubtitleFor(subtitle, new RegExp(String.raw`(?<=\n{2})(${searchResult[1]}(\d+|\w))\.? .*?(?=\n{2})`, 'gis'))
    createSubtitleFor(titleMap, regExp)
  }

  const regExp = /(?<=\n{2})(\d)\. .*(?=\n{2})/gi
  const searchResult = regExp.exec(unprocessedText)
  while (searchResult) {
    const titleMap = new Map()
    parsedDocument.set(searchResult[0], titleMap)
    createSubtitleFor(titleMap, new RegExp(String.raw`(?<=\n{2})(${searchResult[1]}\d+\.) .*?(?=\n{2})`, 'gis'))
    searchResult = regExp.exec(unprocessedText)
  }

  return parsedDocument
}