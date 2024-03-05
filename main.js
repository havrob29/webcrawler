const { argv } = require('node:process');
const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')

function main(){
    // check for one argument
    if(argv.length <= 2){
        console.log('Too few arguments')
        process.exit()
    }
    if(argv.length > 3){
        console.log('Too many arguments')
        process.exit()
    }
    if(argv.length == 3){
        console.log(`Crawling ${argv[2]}...`)
    }

    crawlPage(argv[2], argv[2]).then(pages => {
        printReport(pages)
    })
    
    
}

main()