/*
 * @Description:
 * @Author: doctor
 * @Date: 2020-07-15 11:40:05
 * @LastEditTime: 2020-07-23 14:38:24
 * @LastEditors: doctor
 */

const sessionData = {

}

const storageData = {

}

const cookieData = {

}

const sessionHandle = {
  set: (target, key, value) => {
    sessionStorage.setItem(key, value)
  },
  get: (target, key) => {
    return sessionStorage.getItem(key)
  }
}

const storageHandle = {
  set: (target, key, value) => {
    localStorage.setItem(key, value)
  },
  get: (target, key) => {
    return localStorage.getItem(key)
  }
}

// cookie统一由后台来写
const cookieHandle = {
  get: (target, key) => {
    var name = key + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim()
      if (c.indexOf(name) === 0) { return c.substring(name.length, c.length) }
    }
    return ''
  }
}

const session = new Proxy(sessionData, sessionHandle)
const storage = new Proxy(storageData, storageHandle)
const cookie = new Proxy(cookieData, cookieHandle)

export default {
  session, storage, cookie
}
