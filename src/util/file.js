/*
 * @Description: 
 * @Author: doctor
 * @Date: 2020-07-23 16:14:07
 * @LastEditTime: 2020-07-23 16:41:03
 * @LastEditors: doctor
 */ 

let fs = require('fs');
let http = require("https");

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
function copyFile (targetDir,dir){
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

module.exports = {
  download,copyFile
}