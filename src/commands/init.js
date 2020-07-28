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

// const download = require('download-git-repo')

const wordPath = process.execPath
const config = require('../config/config')
const { copyFile } = require('../util/file')


init()
async function init() {
  // 设置问题
  const answers = await prompt([
    {
      type: 'checkbox',
      name: 'selects',
      message: '请选择需要安装项目',
      choices: [
          { name: 'data', value: 'data.js' },
          { name: 'utils', value: 'utils.js' },
          { name: 'styles', value: 'styles.styl' }
      ]
    }
  ])
  // console.log(__dirname,process.cwd())
  answers.selects.forEach(item=>{
    let fileName = 'src/templates/'+item
    
    copyFile(fileName,path.resolve('test/tmp/'+item))
  })
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
