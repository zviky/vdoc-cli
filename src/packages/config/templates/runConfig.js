/*
 * @Description:
 * @Author: doctor
 * @Date: 2019-09-26 08:39:55
 * @LastEditTime: 2020-07-23 10:13:44
 * @LastEditors: doctor
 */
const fs = require('fs')

process.chdir('./src/config') // cd $1
// 本地 location
// 开发环境 'development'
// 测试环境 'test'
// 线上环境 'production'
const urlConfig = {
  location: {
    isDev: true,
  },
  development: {
    isDev: false,
  },
  test: {
    isDev: false,
  },
  production: {
    isDev: false,
  }
}
const NODE_ENV = process.env.NODE_ENV
console.log(process.env.NODE_ENV)

const configObj = urlConfig[NODE_ENV]
const isDev = configObj.isDev
const configTep = `
export const isDev = ${isDev}
`
fs.writeFileSync('packConfig.js', configTep)

process.exit(0)
