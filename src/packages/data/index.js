
const { copyFile } = require('../../util/file')
const path = require('path')

async function init(){
    // 获取模版文件位置
    let fileName = path.join(__dirname,'./templates/data.js')
    await copyFile(fileName,path.resolve('test/tmp/data.js'))
}

module.exports = {
    init
}