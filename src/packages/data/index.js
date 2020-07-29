
const { copyFile } = require('../../util/file')
const path = require('path')

init()

function init(){
    // 获取模版文件位置
    let fileName = path.join(__dirname,'./templates/data.js')
    copyFile(fileName,path.resolve('test/tmp/data.js'))
}