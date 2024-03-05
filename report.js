function sortReport(pages){
    let sortable = []
    for(var link in pages){
        sortable.push([link, pages[link]])
    }
    sortable.sort(function(b,a){
        return a[1] - b[1]
    })
    let objSorted = {}
    sortable.forEach(function(item){
        objSorted[item[0]]=item[1]
    })
    return objSorted
}

function printReport(pages){
    console.log('*****FINISHED CRAWLING*****')
    console.log('Starting report...:')

    const sortedPages = sortReport(pages)

    for(const key in sortedPages){
        console.log(`found ${pages[key]} internal links to ${key}`)
    }
}

module.exports = {
    printReport
}