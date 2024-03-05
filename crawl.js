const url = require('node:url');
const jsdom = require("jsdom");
const { link } = require('node:fs');
const { JSDOM } = jsdom;

//takes URLs and returns URL in a normalized format (to check if pages are the same)
function normalizeURL(url){
    let myURL = new URL(url)

    let normalized = myURL.origin + myURL.pathname

    normalized = normalized.replace('www.','')
    normalized = normalized.replace('.html', '')

    if(normalized.substring(normalized.length-1) === '/'){
        normalized = normalized.substring(0, normalized.length-1)
    }
    return normalized
}

//takes HTML text and returns links found in text
async function getURLsFromHTML(htmlBody, baseURL){
    let jsdom = new JSDOM(htmlBody, {
        url: baseURL
    })
    aTags = jsdom.window.document.querySelectorAll("a")
    let listOfUrls = []

    for(let i=0; i<aTags.length; i++)
    {
        listOfUrls.push(aTags[i].origin + aTags[i].pathname)
    }
    
    listOfUrls = listOfUrls.filter((x) => x.length > 0);

    return listOfUrls
}


//recursively crawl each URL on a page until we've
//crawled every page on the site
async function crawlPage(baseURL, currentURL, pages = {}){
    const base = new URL(baseURL)
    const current = new URL(currentURL)
    if(!(base.hostname == current.hostname)){
        //console.log(`${current.hostname} not the same domain`)
        return pages
    }
    const currentNorm = normalizeURL(currentURL)
    if(pages[currentNorm]){
        pages[currentNorm]++
        return pages
    }else{
        pages[currentNorm] = 1
    }

    const response = await fetch(currentNorm)

    if(response.status >= 400){
        //console.log(`${current.hostname} - HTML error'`)
        return pages
    }

    myHeaders = response.headers
    if(!(myHeaders.get('content-type').includes('text/html'))){
        //console.log(`${current.hostname} - content type not text/html`)
        return pages
    }

    console.log(`making request to ${currentNorm}`)
    const fetchedLinks = await getURLsFromHTML(await response.text(), currentNorm)

    for(const link of fetchedLinks){
        normLink = normalizeURL(link)
        crawlPage(baseURL, normLink, pages)
        if(pages[normLink]){
            pages[normLink]++
        }else{
            pages[normLink] = 1
        }
    }
    return pages
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}