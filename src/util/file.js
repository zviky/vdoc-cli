/*
 * @Description: 
 * @Author: doctor
 * @Date: 2020-07-23 16:14:07
 * @LastEditTime: 2020-07-23 16:41:03
 * @LastEditors: doctor
 */ 

let fs = require('fs');
let http = require("https");
const { prompt } = require('inquirer')

const chalk = require('chalk');

function download(url) {
  return new Promise((resolve,reject)=>{
    http.get(url, function(res){
      let fileData = "";
      let contentLength = parseInt(res.headers['content-length']);
      //总长度		
      console.log(contentLength);
      res.setEncoding("binary");
      res.on("data", function(chunk){
        fileData+=chunk;
        let process = ((fileData.length)/contentLength) * 100;
        let percent = parseInt(((process).toFixed(0)));
        //任务栏进度条
        console.log(percent);                  
      });
      res.on("end", function(){
        resolve(fileData)
      });
    });
  })
}

/**
 * @description copy file into target dir
 * @param {string} targetDir  
 * @param {string} dir
 */
async function copyFile (targetDir,dir){
  const exist = await exitstFile(dir)
  if(exist){
    const answers = await prompt([
      {
        type: 'confirm',
        name: 'rewrite',
        message: `${dir} 文件已存在，是否覆盖`,
      }
    ])
    if(!answers.rewrite) return
  }

  fs.readFile(targetDir,'utf-8', function(err, data) {
    if (err) {
        throw err;
    } 
    fs.writeFile(dir,data,'utf-8',function(error){
       if(error){
          throw error;
       }
    });  
  })
}

/**
 * @description 判断目录是否存在
 * @param {String} dir
 * @returns Boolean
 */
function exitstFile(dir){
  return new Promise(resolve=>{
    fs.exists(dir, function(exists) {
      resolve(exists)
    })
  })

}

/**
 * @description 创建目录，会递归创建
 * @param {*} dir
 */
function mkdir(dir){
  fs.mkdir(dir, { recursive: true }, (err) => {
    if (err) throw err;
  });
}

module.exports = {
  download,copyFile,mkdir
}