const execa = require('execa')
const path = require('path')

const ora = require('ora');
 


const plugins = process.argv.slice(3,process.argv.length)

console.log(process.execPath)  // /usr/local/bin/node
console.log(__dirname)         // /usr/local/lib/node_modules/vdoc-cli/src/commands
console.log(process.cwd())     // /Users/doctor/programs/fed/mobile 

addPlugin()
function addPlugin(){
    plugins.forEach(item=>{
        const spinner = ora(`Loading ${item}`).start();

        let exePath = path.join(__dirname,`../packages/${item}/index.js`) 
        setTimeout(() => {
            spinner.color = 'yellow';
            spinner.text = `Loading ${item}`;
        });
        
        try {
            // shell:true必须添加
            execa.sync('node',[exePath],{
                shell:true 
            })
            spinner.stop()

        } catch (error) {
            console.log(error)
        }
    })
}

