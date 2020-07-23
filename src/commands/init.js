/*
 * @Description: 
 * @Author: doctor
 * @Date: 2020-07-23 13:43:45
 * @LastEditTime: 2020-07-23 17:14:13
 * @LastEditors: doctor
 */ 
const { prompt } = require('inquirer')
const ora = require('ora')
const download = require('download-git-repo')

const config = require('../config/config')

init()
async function init() {
  // 设置问题
  const answers = await prompt([
    {
      type: 'checkbox',
      name: 'selects',
      message: '请选择需要安装项目',
      choices: [
          { name: 'data', value: 1 },
          { name: 'utils', value: 2 },
          { name: 'styles', value: 3 }
      ]
    }
  ])

  download(config.path,'test/tmp',(err)=>{
    console.log(err)
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
