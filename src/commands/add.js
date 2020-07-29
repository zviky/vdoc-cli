const execa = require('execa')
const path = require('path')

const plugins = process.argv.slice(3,process.argv.length)

console.log(process.execPath)  // /usr/local/bin/node
console.log(__dirname)         // /usr/local/lib/node_modules/vdoc-cli/src/commands
console.log(process.cwd())     // /Users/doctor/programs/fed/mobile 

addPlugin()
function addPlugin(){
    plugins.forEach(item=>{
        let exePath = path.join(__dirname,`../packages/${item}/index.js`) 
        try {
            // shell:true必须添加
            execa.sync('node',[exePath],{
                shell:true 
            })
        } catch (error) {
            console.log(error)
        }
    })
}

