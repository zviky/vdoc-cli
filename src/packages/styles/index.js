const { copyFile } = require('../../util/file')
const path = require('path')

const temps = ['function.styl','globle.styl','theme.styl']

init()

function init(){
    temps.forEach(item=>{
        // 获取模版文件位置
        let fileName = path.join(__dirname,`./templates/${item}`)
        copyFile(fileName,path.resolve(`test/tmp/styles/${item}`))
    })
}