/*
 * @Description: 
 * @Author: doctor
 * @Date: 2020-07-23 16:14:07
 * @LastEditTime: 2020-07-23 16:41:03
 * @LastEditors: doctor
 */ 

let fs = require('fs');
let http = require("https");
let buf = new Buffer.alloc(10240);
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

/**
 * 重写package.json中的script部分
 */
function reWritePackage(path = './package.json') {
  fs.open(path, 'r+', function(err, fd){
    if (err) {
      return console.error(err);
    }
    fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
      if (err){
         console.log(err);
      }
      
      // 仅输出读取的字节
      if(bytes > 0){
         let obj = JSON.parse(buf.slice(0, bytes).toString())
         let userCommand = {
          "test": "echo \"Error: no test specified\" && exit 1",
          "build:dev": "cross-env NODE_ENV=development node runConfig",
          "build:test": "cross-env NODE_ENV=test node runConfig",
          "build:pro": "cross-env NODE_ENV=production node runConfig"
         }
         obj.scripts = userCommand
         let finalJson = JSON.stringify(obj, null, 2)

         fs.writeFileSync(path, finalJson,  function(err) {
          if (err) {
              return console.error(err);
          }
          fs.close(fd, function(err){
            if (err){
               console.log(err);
            } 
            console.log("文件关闭成功");
          });
        });
      }
   });
  })
}

reWritePackage();

module.exports = {
  download,copyFile,mkdir
}