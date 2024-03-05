function printReport(pages){
    for(const key in pages){
        console.log(`found ${pages[key]} links to ${key}`)
    }
}

module.exports = {
    printReport
}