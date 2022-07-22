export const getLastPageFromHeaders = headers => {
    const linkHeaderIndex = headers.findIndex(header => header[0] === 'link')
    const linkHeaderUrls = headers[linkHeaderIndex][1].split(',')
    const lastPageUrl = linkHeaderUrls.find(url => url.includes('rel="last"')).split(';')[0]
    const lastPagePartialStr = lastPageUrl.slice(lastPageUrl.indexOf('&page=') + 6)
    const lastPageNum = lastPagePartialStr.slice(0, lastPagePartialStr.indexOf('&'))
    return Number(lastPageNum)
}