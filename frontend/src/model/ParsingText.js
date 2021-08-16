// Takes text and return Map with recursed structure: {TitleText: {subTitleText: {subSubTitleText etc.}}}
export default function convertTextToMap(unprocessedText) {
  const parsedText = new Map()

  function createSubtitleFor(titleMap, regExp) {
    let searchResult = regExp.exec(unprocessedText)
    if (!searchResult) return
    
    const subtitle = new Map()
    titleMap.set(searchResult[0], subtitle)

    createSubtitleFor(subtitle, new RegExp(String.raw`(?<=(\r\n){2})(${searchResult[2]}(\d+|\w))\.? .*?(?=(\r\n){2})`, 'gis'))
    createSubtitleFor(titleMap, regExp)
  }

  // This is kind of kludge because I have no RegExp that fits titles and subtitle at the same time.
  // The code creates main 9 titles
  const regExp = /(?<=(\r\n){2})(\d)\. .*(?=(\r\n){2})/gi
  let searchResult = regExp.exec(unprocessedText)
  while (searchResult) {
    const titleMap = new Map()
    parsedText.set(searchResult[0], titleMap)
    createSubtitleFor(titleMap, new RegExp(String.raw`(?<=(\r\n){2})(${searchResult[2]}\d+\.) .*?(?=(\r\n){2})`, 'gis'))
    searchResult = regExp.exec(unprocessedText)
  }

  return parsedText
}