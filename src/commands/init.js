/*
 * @Description: 
 * @Author: doctor
 * @Date: 2020-07-23 13:43:45
 * @LastEditTime: 2020-07-23 17:14:13
 * @LastEditors: doctor
 */ 
const { prompt } = require('inquirer')
const ora = require('ora')
const path = require('path')
const execa = require('execa');
const {addPlugin} = require('./add')

// const download = require('download-git-repo')

const wordPath = process.execPath
const config = require('../config/config')

console.log(process.execPath)  // /usr/local/bin/node
console.log(__dirname)         // /usr/local/lib/node_modules/vdoc-cli/src/commands
console.log(process.cwd())     // /Users/doctor/programs/fed/mobile

init()
async function init() {
  // 设置问题
  try{
    const answers = await prompt([
      {
        type: 'checkbox',
        name: 'selects',
        message: '请选择需要安装项目',
        choices: [
            { name: 'data', value: 'data' },
            { name: 'utils', value: 'utils' },
            { name: 'styles', value: 'styles' }
        ]
      }
    ])
    // answers.selects.forEach(item=>{
    //   // let exec = `vdoc add ${item}`
    //   // execa.sync(exec)
    //   execa.sync('vdoc',['add',`${item}`])
    // })
      for(item of answers.selects){
       await addPlugin(item)
      }
    } catch (error) {
      console.log(error)
    }
}

  // 处理结果
  // download(config.path,'test/tmp',(err)=>{
  //   console.log(err ? 'Error' + err : 'Success')
  // })

  // const spinner = ora('Loading unicorns').start();
  // console.log(`你的名字: `, answers.selects)
  // spinner.color = 'yellow';
  // spinner.text = 'Loading rainbows';
  // setTimeout(() => {
  //   spinner.stop()
  //   }, 1000);
